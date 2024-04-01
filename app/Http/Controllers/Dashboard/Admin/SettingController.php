<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserIdentity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;


class SettingController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function consumerApi()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $identity = UserIdentity::select("status_id", "logo")->where("user_id", "=", Auth::user()->id)->first();

        return Inertia::render('Admin/ConsumerApp', [
            "totalNotify" => $totalNotify,
            "status_id" => $identity->status_id ?? null,
            "identity" => $identity,
        ]);
    }

    public function getChangePassword()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $identity = UserIdentity::select("status_id", "logo")->where("user_id", "=", Auth::user()->id)->first();
        
        return Inertia::render('General/ChangePassword', [
            "totalNotify" => $totalNotify,
            "status_id" => $identity->status_id ?? null,
            "identity" => $identity ?? null,
        ]);
    }

    public function patchChangePassword(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
            'current_password' => 'required',
            'new_password' => ['required', Rules\Password::defaults()],
        ]);

        $http_code = Response::HTTP_OK;
        $response = [
            'message' => 'Change password success',
            'data' => null
        ];

        $user = DB::table('users')
            ->select('password')
            ->where('id', '=', $request->id)
            ->first();


        if (!(Hash::check($request->get('current_password'), $user->password))) {
            // The passwords matches

            $http_code = Response::HTTP_BAD_REQUEST;
            $response["message"] = "Your current password does not matches with the password.";
        } else if (strcmp($request->get('current_password'), $request->get('new_password')) == 0) {
            // Current password and new password same
            $http_code = Response::HTTP_BAD_REQUEST;
            $response["message"] = "New Password cannot be same as your current password.";
        }

        //Change Password
        $updateUser = tap(User::where('id', $request->id))->update([
            'password' => Hash::make($request->new_password)
        ])->first();


        Auth::login(($updateUser));

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, 200);
    }
}
