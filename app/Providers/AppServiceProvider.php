<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Facades\Lang;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // time zone
        config(['app.locale' => 'id']);
        Carbon::setLocale('id');

        // redirect to https
        // if ($this->app->environment('production')) {
        //     URL::forceScheme('https');
        // }

        // shared env
        Inertia::share('appUrl', config('app.url'));

        // rewrite email verification
        VerifyEmail::toMailUsing(function ($notifiable) {
            $verifyUrl = URL::temporarySignedRoute(
                'verification.verify',
                Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            return (new MailMessage)
                ->greeting(Lang::get('Email Verifikasi'))
                ->subject(Lang::get('Email Verifikasi'))
                ->line(Lang::get('Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda.'))
                ->action(Lang::get('Verifikasi'), $verifyUrl)
                ->line(Lang::get('Jika Anda tidak membuat akun, tidak diperlukan tindakan lebih lanjut.'));
        });

        // rewrite reset password verification
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));
            return (new MailMessage)
                ->greeting(Lang::get('Reset Katasandi'))
                ->subject(Lang::get('Reset Katasandi'))
                ->line(Lang::get('Anda menerima email ini karena kami menerima permintaan untuk pengaturan ulang kata sandi terhadap akun Anda.'))
                ->line(Lang::get('Tautan reset ini akan kedaluwarsa dalam :count menit.', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
                ->action(Lang::get('Reset'), $url)
                ->line(Lang::get('Jika Anda tidak meminta pengaturan ulang kata sandi, tidak perlu tindakan lebih lanjut yang diperlukan.'));
        });
    }
}
