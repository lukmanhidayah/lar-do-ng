<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Kecamatan;
use App\Models\Notification;
use App\Models\UserIdentity;
use App\Models\UserStatus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BerandaController extends Controller
{
    public function create()
    {
        $userRoleId = Auth::user()->user_role_id;
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        if ($userRoleId == 2) {
            $identity = UserIdentity::select("user_identities.status_id as status_id", "user_identities.logo as logo")
                ->where("user_id", "=", Auth::user()->id)->first();
            $statusId = $identity->status_id;
            return Inertia::render('User/Beranda', [
                "statusId" => $statusId,
                "totalNotify" => $totalNotify,
                "identity" => $identity
            ]);
        }

        $summary = UserStatus::select("user_statuses.id as id", "user_statuses.name as name", DB::raw("COUNT(user_identities.id) as total"))
            ->leftJoin('user_identities', 'user_identities.status_id', '=', 'user_statuses.id')
            ->where('user_statuses.id', "<>", "1")
            ->groupBy('user_statuses.id')->get();

        return Inertia::render('Admin/Beranda', [
            'summary' => $summary,
            "totalNotify" => $totalNotify,
            'chart' => $this->chartMapper(Kecamatan::select("kecamatans.name as name", "kecamatans.id as id", DB::raw("(CASE WHEN Count(user_identities.id) > 0 THEN Count(user_identities.id) ELSE 0.25 end) AS total"))
                ->leftJoin(
                    'user_addresses',
                    'kecamatans.id',
                    '=',
                    'user_addresses.kecamatan_id'
                )
                ->leftJoin(
                    'users',
                    'users.id',
                    '=',
                    'user_addresses.user_id'
                )
                ->leftJoin(
                    'user_identities',
                    function ($q) {
                        $q->on(
                            'users.id',
                            '=',
                            'user_identities.user_id'
                        )->where(
                            'user_identities.status_id',
                            '=',
                            5
                        );
                    }
                )->where('kabupatan_kota_id', 3273)
                ->groupBy("id")
                ->get(), function ($key, $value) {
                return [
                    'id' => $value->id,
                    'name' => $value->name,
                    'total' => floatval($value->total)
                ];
            })
        ]);
    }
}
