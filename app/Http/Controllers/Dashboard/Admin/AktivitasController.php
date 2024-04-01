<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\UserActivity;
use App\Models\UserIdentity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isNull;

class AktivitasController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());

        return Inertia::render('Admin/Aktivitas', [
            "totalNotify" => $totalNotify
        ]);
    }

    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function list($url_slug)
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $identity = UserIdentity::select("user_identities.status_id as status_id", "user_identities.logo as logo")
            ->where("user_id", "=", Auth::user()->id)->first();
        return Inertia::render('Admin/AktivitasWithId', [
            'url_slug' => $url_slug,
            "identity" => $identity,
            "totalNotify" => $totalNotify
        ]);
    }

    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function detail($id)
    {

        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $activity = UserActivity::select(
            "users.name as lks",
            "user_activities.nama as nama",
            "user_activities.deksripsi as deksripsi",
            "user_activities.tujuan as tujuan",
            "user_activities.maksud as maksud",
            "user_activities.sasaran as sasaran",
            "user_activities.jumlah as jumlah",
            "user_activities.total_anggaran as total_anggaran",
            "user_activities.narasumber as narasumber",
            "user_activities.tempat as tempat",
            DB::raw('GROUP_CONCAT(user_activity_images.name) AS image_url'),
            "user_activities.created_at as created_at"
        )->leftJoin("users", "users.id", "=", "user_activities.user_id")
            ->leftJoin("user_activity_images", "user_activity_images.activity_id", "=", "user_activities.id")
            ->where("user_activities.id", "=", $id)->groupBy("user_activities.id")->first();
        $identity = UserIdentity::select("status_id", "logo")->where("user_id", "=", Auth::user()->id)->first();
        if (isset($activity)) {
            return Inertia::render('General/DetailAktivitas', [
                "activity" => $activity,
                "totalNotify" => $totalNotify,
                "identity" => $identity ?? null,
            ]);
        }
        return abort(404);
    }
}
