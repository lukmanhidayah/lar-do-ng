<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserDocument;
use App\Models\UserIdentity;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PDF;
use Throwable;

class LegalitasController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function create($url_slug)
    {
        try {
            $user = User::select("id")->where("url_slug", "=", $url_slug)->first();
            $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
            $documents = UserDocument::select("*")->where("user_id", "=", $user->id)->first();
            $identity = UserIdentity::select("user_identities.status_id as status_id", "user_identities.logo as logo")
                ->where("user_id", "=", Auth::user()->id)->first();
            if (isset($documents) == true && (Auth::user()->id == $user->id || Auth::user()->user_role_id != 2)) {
                return Inertia::render('General/ListLegalitas', [
                    'id' => $user->id,
                    "totalNotify" => $totalNotify,
                    "identity" => $identity,
                    "data" =>  $documents
                ]);
            } else {
                abort(404);
            }
        } catch (Throwable $e) {
            abort(404, $e);
        }
    }
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function tanda_daftar_yayasan($id)
    {
        $data = User::select(
            "users.name as name",
            "user_identities.notaris as notaris",
            "user_identities.nomor_akta as nomor_akta",
            "user_identities.no_reg as no_reg",
            "user_identities.ketua as ketua",
            "user_scopes.name as lingkup",
            "user_scopes.id as lingkup_id",
            "user_identities.tanggal_expire as tanggal_expire",
            "user_addresses.alamat as alamat",
            "user_addresses.rt as rt",
            "user_addresses.rw as rw",
            "kelurahans.name as kelurahan",
            "kecamatans.name as kecamatan",
        )
            ->leftJoin("user_identities", "user_identities.user_id", "=", "users.id")
            ->leftJoin("user_scopes", "user_scopes.id", "=", "user_identities.lingkup_id")
            ->leftJoin("user_addresses", "user_addresses.user_id", "=", "users.id")
            ->leftJoin("kelurahans", "kelurahans.id", "=", "user_addresses.kelurahan_id")
            ->leftJoin("kecamatans", "kecamatans.id", "=", "user_addresses.kecamatan_id")
            ->where("users.id", "=", $id)
            ->first();


        if (isset($data) == true) {
            return Inertia::render('General/TandaDaftarYayasan', [
                "data" =>  $data
            ]);
        } else {
            abort(404);
        }
    }

    public function generate_pdf_tdy($url_slug)
    {
        // $user = "lks_"."Lukman Hidayah";
        // var_dump(str_replace(' ', '_', strtolower($user)));
        // die;
        $user = User::select(
            "users.name as name",
            "user_identities.notaris as notaris",
            "user_identities.nomor_akta as nomor_akta",
            "user_identities.no_reg as no_reg",
            "user_identities.ketua as ketua",
            "user_scopes.name as lingkup",
            "user_scopes.id as lingkup_id",
            "user_identities.tanggal_perpanjang as tanggal_perpanjang",
            "user_identities.tanggal_expire as tanggal_expire",
            "user_addresses.alamat as alamat",
            "user_addresses.rt as rt",
            "user_addresses.rw as rw",
            "kelurahans.name as kelurahan",
            "kecamatans.name as kecamatan",
            "lks_statuses.name as lks_status",
            "type_rehabs.name as type_rehab",
            "user_types.name as user_type",
            "users.url_slug as url_slug",
        )
            ->leftJoin("user_identities", "user_identities.user_id", "=", "users.id")
            ->leftJoin("user_scopes", "user_scopes.id", "=", "user_identities.lingkup_id")
            ->leftJoin("lks_statuses", "lks_statuses.id", "=", "user_identities.lks_status_id")
            ->leftJoin("type_rehabs", "type_rehabs.id", "=", "user_identities.type_rehab_id")
            ->leftJoin("user_types", "user_types.id", "=", "user_identities.type_id")
            ->leftJoin("user_addresses", "user_addresses.user_id", "=", "users.id")
            ->leftJoin("kelurahans", "kelurahans.id", "=", "user_addresses.kelurahan_id")
            ->leftJoin("kecamatans", "kecamatans.id", "=", "user_addresses.kecamatan_id")
            ->where("users.url_slug", "=", $url_slug)
            ->first();

        if (isset($user) == true) {
            $html =  view('generate_pdf', $user);
            $pdf = PDF::loadHTML($html);
            return $pdf->stream();
        } else {
            abort(404);
        }
    }
}
