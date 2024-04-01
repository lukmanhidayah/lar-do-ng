<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\UserIdentity;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $identity = UserIdentity::select("user_identities.status_id as status_id", "user_identities.logo as logo")
            ->where("user_id", "=", Auth::user()->id)->first();
        return Inertia::render('General/Notification', [
            "identity" => $identity
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function markAsRead(Request $request)
    {
        $request->validate([
            'from_id' => 'required',
            'user_id' => 'required',
            'id' => 'required',
        ]);

        $now = Carbon::now();

        Notification::where('id', '=', $request->id)
            ->update([
                "status_id" => 2,
                'updated_at' => $now->toDateTimeString()
            ]);


        if ($request->user_id == 1) {
            if ($request->from_id != 2) {
                return redirect()->route("permohonan/id", $request->from_id);
            } else {
                return redirect()->route('aktivitas');
            }
        } else {
            if ($request->user_id != 2) {
                return redirect()->route('profile');
            } else {
                return redirect()->route('permohonan');
            }
        }
    }
}
