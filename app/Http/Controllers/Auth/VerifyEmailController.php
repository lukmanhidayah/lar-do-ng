<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Brick\Math\BigNumber;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Foundation\Auth\EmailVerificationRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request)
    {
        try {
            $user = User::find($request->route('id'));
            $dateNow = Carbon::now();

            if ($this->authorizeEmail($request->route('id'), $request->route('hash'), User::find($request->route('id'))) == false) {
                throw new AuthorizationException();
            }

            if ((int) $request->query('expires') < (int) $dateNow->getTimestamp()) {
                throw new AuthorizationException();
            }

            if ($user->hasVerifiedEmail()) {
                return redirect()->intended(RouteServiceProvider::HOME);
            }

            if ($user->markEmailAsVerified()) {
                $auth = Auth::user();
                if (!is_null($auth) && $auth->id == $user->id) {
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                }
            }

            return redirect()->route('login')->with('status', "Email telah berhasil diverifikasi. Silakan login.");
        } catch (Throwable $e) {
            throw new AuthorizationException();
        }
    }

    public function authorizeEmail($id, $hash, $user)
    {
        if (!hash_equals(
            (string) $id,
            (string) $user->getKey()
        )) {
            return false;
        }
        if (!hash_equals(
            (string) $hash,
            sha1($user->getEmailForVerification())
        )) {
            return false;
        }

        return true;
    }
}
