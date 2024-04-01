<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\UserIdentity;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'nomor_handphone' => 'required|numeric|unique:user_identities',
            'name' => 'required|string|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'email' => $request->email,
                'user_role_id' => 2,
                'url_slug' => str_replace(' ', '_', strtolower($request->name)),
                'name' => $request->name,
                'password' => Hash::make($request->password),
            ]);

            $date = new Carbon($user["created_at"]);

            $dateNoReg = $date->format('Y-m-d');

            $userIdentity = UserIdentity::create([
                'nomor_handphone' => $request->nomor_handphone,
                'user_id' => $user->id,
                'tanggal_expire' => $date->addWeeks(1),
                'status_id' => 1,
                'no_reg' => $this->createNoReg($user->id, $dateNoReg)
            ]);

            $userAddress = UserAddress::create([
                'provinsi_id' => 32,
                'kabupaten_kota_id' => 3273,
                'kecamatan_id' => null,
                'kelurahan_id' => null,
                'user_id' => $user->id,
            ]);

            event(new Registered($user, $userIdentity));

            Auth::login($user);

            $request->user()->sendEmailVerificationNotification();
        });

        return redirect(RouteServiceProvider::HOME);
    }

    private function createNoReg($userId, $createdAt)
    {
        $data = User::whereDate("created_at", $createdAt)->where('user_role_id', '=', '2')->orderBy('id', 'ASC')->get()->toArray();

        $search = array_search($userId, array_column($data, 'id'), TRUE);
        $date = new Carbon($data[$search]["created_at"]);

        $month = $date->month;
        $day = $date->day;
        if ($day < 10) {
            $day = "0" . $day;
        }
        if ($month < 10) {
            $month = "0" . $month;
        }
        $year = $date->year;

        if ($search < 10) {
            $search = "00" . $search + 1;
        } else if ($search < 100) {
            $search = "0" . $search + 1;
        }
        return "LKS/" . $day . $month . $year . "/dinsos-BDG/0" . $search;
    }
}
