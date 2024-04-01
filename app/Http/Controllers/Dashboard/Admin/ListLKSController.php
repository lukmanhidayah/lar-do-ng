<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Throwable;

class ListLKSController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());

        return Inertia::render('Admin/ListLKS', [
            "totalNotify" => $totalNotify
        ]);
    }

    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function list($id)
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        return Inertia::render('Admin/AktivitasWithId', [
            'id' => $id,
            "totalNotify" => $totalNotify
        ]);
    }

    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function detail($url_slug)
    {
        try {
            $user_id = Auth::user()->id;
            $data = User::select(
                '*',
                'users.name as name',
                'kel.name as kelurahan_name',
                'kec.name as kecamatan_name',
                'type_rehabs.name as type_rehab_name',
                'lks_statuses.name as lks_status_name',
                'up.name as posisi_name',
                'banks.name as bank_name',
                'us.name as lingkup_name',
                'users.id as id',
                'ui.created_at as created_at',
                'ui.updated_at as updated_at',
            )
                ->join('user_addresses as ua', 'ua.user_id', '=', 'users.id')
                ->join('user_identities as ui', 'ui.user_id', '=', 'users.id')
                ->join('user_documents as ud', 'ud.user_id', '=', 'users.id')
                ->join('kelurahans as kel', 'ua.kelurahan_id', '=', 'kel.id')
                ->join('kecamatans as kec', 'ua.kecamatan_id', '=', 'kec.id')
                ->join('user_positions as up', 'ui.posisi_id', '=', 'up.id')
                ->join('banks', 'ui.bank_id', '=', 'banks.id')
                ->join('user_scopes as us', 'ui.lingkup_id', '=', 'us.id')
                ->leftJoin("type_rehabs", "type_rehabs.id", "=", "ui.type_rehab_id")
                ->leftJoin("lks_statuses", "lks_statuses.id", "=", "ui.lks_status_id")
                ->where('users.url_slug', '=', $url_slug)
                ->first();

            $id = $data->id;

            $totalNotify = count(Notification::select()->where("to_id", "=", $user_id)->where("status_id", "=", 1)->get());
            return Inertia::render('Admin/DetailLks', [
                'id' => $id,
                'data' => $data,
                'activities' => UserActivity::where('user_id', $id)->skip(0)
                    ->take(3)->orderBy("user_activities.created_at", "DESC")->get(),
                "totalNotify" => $totalNotify
            ]);
        } catch (Throwable $e) {
            abort(404, $e);
            return false;
        }
    }
}
