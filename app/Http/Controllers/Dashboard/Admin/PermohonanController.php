<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminPermohonanLog;
use App\Models\Notification;
use App\Models\PermohonanLog;
use App\Models\RevisiLog;
use App\Models\RevisiLogComment;
use App\Models\User;
use App\Models\UserDocument;
use App\Models\UserIdentity;
use App\Models\UserType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;
use PDF;

class PermohonanController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $tabIndex = 0;
        if ($request->type == "diperiksa") {
            $tabIndex = 1;
        }
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        return Inertia::render('Admin/Permohonan', [
            'tabIndex' => $tabIndex,
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
        $user_id = Auth::user()->id;
        $user_role_id = Auth::user()->user_role_id;
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
            ->leftJoin('user_addresses as ua', 'ua.user_id', '=', 'users.id')
            ->leftJoin('user_identities as ui', 'ui.user_id', '=', 'users.id')
            ->leftJoin('user_documents as ud', 'ud.user_id', '=', 'users.id')
            ->leftJoin('kelurahans as kel', 'ua.kelurahan_id', '=', 'kel.id')
            ->leftJoin('kecamatans as kec', 'ua.kecamatan_id', '=', 'kec.id')
            ->leftJoin('user_positions as up', 'ui.posisi_id', '=', 'up.id')
            ->leftJoin('banks', 'ui.bank_id', '=', 'banks.id')
            ->leftJoin('user_scopes as us', 'ui.lingkup_id', '=', 'us.id')
            ->leftJoin("type_rehabs", "type_rehabs.id", "=", "ui.type_rehab_id")
            ->leftJoin("lks_statuses", "lks_statuses.id", "=", "ui.lks_status_id")
            ->where('users.id', '=', $id)
            ->first();

        $totalNotify = count(Notification::select()->where("to_id", "=", $user_id)->where("status_id", "=", 1)->get());
        if ($user_role_id == 3) {
            if ($data->status_id != 3) {
                return redirect('/permohonan?type=diperiksa');
            } else {
                return Inertia::render('Admin/PermohonanKadis', [
                    'id' => $id,
                    'data' => $data,
                    "totalNotify" => $totalNotify
                ]);
            }
        } else if ($data->status_id != 2) {
            return redirect('/permohonan?type=diperiksa');
        }

        return Inertia::render('Admin/PermohonanWithId', [
            'id' => $id,
            'data' => $data,
            'userTypes' => $this->mymapper(UserType::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => $value->name . " - " . $value->desc
                ];
            }),
            "totalNotify" => $totalNotify
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:user_statuses,id',
        ]);


        DB::transaction(function () use ($request) {

            $from_id = Auth::user()->id;
            $now = Carbon::now();
            $user_id = $request->user_id;
            UserIdentity::where('user_id', $request->user_id)->update([
                'status_id' => $request->status_id,
                'type_id' => $request->type_id,
                'updated_at' => $now->toDateTimeString()
            ]);

            $data = User::select()->where('id', '=', $user_id)->first();

            $notifications =  [
                [
                    'from_id' => $from_id,
                    'to_id' => 2,
                    'status_id' => 1,
                    'message' => "Yayasan atas nama " . $data->name . " telah diverifikasi oleh Admin, silahkan kepada Kepala Dinas Sosial untuk melakukan persetujuan atau penolakan terhadap yayasan tersebut.",
                ],
                [
                    'from_id' => $from_id,
                    'to_id' => $user_id,
                    'status_id' => 1,
                    'message' => "Permohonan pendaftaran LKS/Yayasan/Orsos telah berhasil diverifikasi oleh Admin. Selanjutnya menunggu validasi dan persetujuan dari Kepala Dinas Sosial.",
                ]
            ];
            Notification::insert($notifications);

            AdminPermohonanLog::create([
                'from_id' => $from_id,
                'user_id' => $request->user_id,
                'status_id' => $request->status_id,
            ]);
        });

        return redirect('/permohonan?type=diperiksa');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeKadis(Request $request)
    {

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:user_statuses,id',
        ]);


        DB::transaction(function () use ($request) {

            $from_id = Auth::user()->id;
            $now = Carbon::now();
            $nextYear = Carbon::now();

            $user_id = $request->user_id;
            UserIdentity::where('user_id', $request->user_id)->update([
                'status_id' => 5,
                'tanggal_perpanjang' => $now->toDateTimeString(),
                'tanggal_expire' => $nextYear->addYear(1),
                'updated_at' => $now->toDateTimeString()
            ]);

            $data = User::select()->where('id', '=', $user_id)->first();

            $user = User::select(
                "users.name as name",
                "users.url_slug as url_slug",
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
                ->where("users.id", "=", $user_id)
                ->first();

            $locate_n_name_tdy = $user->url_slug . '/file_tanda_daftar_yayasan.pdf';

            $html =  view('generate_pdf', $user);
            $pdf = PDF::loadHTML($html);
            Storage::put('public/uploads/' . $locate_n_name_tdy, $pdf->output());

            UserDocument::updateOrCreate([
                'user_id' => $user_id,
            ], [
                'file_tanda_daftar_yayasan' => $locate_n_name_tdy
            ]);

            $notifications =  [
                [
                    'from_id' => $from_id,
                    'to_id' => 1,
                    'status_id' => 1,
                    'message' => "Yayasan atas nama " . $data->name . " telah diterima oleh Kepala Dinas Sosial kota Bandung.",
                ],
                [
                    'from_id' => $from_id,
                    'to_id' => $user_id,
                    'status_id' => 1,
                    'message' => "Selamat kepada yayasan atas nama " . $data->name . " telah disetujui, sekarang yayasan " . $data->name . " telah resmi terdaftar di Dinas Sosial kota Bandung.",
                ]
            ];
            Notification::insert($notifications);

            AdminPermohonanLog::create([
                'from_id' => $from_id,
                'user_id' => $request->user_id,
                'status_id' => $request->status_id,
            ]);
        });

        return redirect('/permohonan?type=diperiksa');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeRevis(Request $request)
    {

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:user_statuses,id',
        ]);


        DB::transaction(function () use ($request) {

            $from_id = Auth::user()->id;
            $now = Carbon::now();
            $nextWeek = Carbon::now();

            $user_id = $request->user_id;
            UserIdentity::where('user_id', $request->user_id)->update([
                'status_id' => $request->status_id,
                'tanggal_expire' => $nextWeek->addWeek(),
                'updated_at' => $now->toDateTimeString()
            ]);

            $data = User::select()->where('id', '=', $user_id)->first();


            $notifications =  [
                [
                    'from_id' => $from_id,
                    'to_id' => $user_id,
                    'status_id' => 1,
                    'message' => "Mohon maaf yayasan atas nama " . $data->name . " telah ditolak oleh Admin, silahkan lakukan permohonan kembali pada dokumen yang belum sesuai dan perhatikan catatan yang diberikan Admin, serta ajukan permohonan kembali sebelum melewati tanggal " . Carbon::parse($nextWeek)->format('d/m/Y') . ".",
                ]
            ];
            Notification::insert($notifications);

            $dataRevisi = RevisiLog::create([
                "user_id" => $user_id,
                "data_umum" => $request->data_umum,
                "data_identitas" => $request->data_identitas,
                "data_legalitas" => $request->data_legalitas,
                "file_akta_pendirian" => $request->file_akta_pendirian,
                "file_izin_pendirian" => $request->file_izin_pendirian,
                "file_adart" => $request->file_adart,
                "file_susunan_pengurus" => $request->file_susunan_pengurus,
                "file_surat_domisili" => $request->file_surat_domisili,
                "file_npwp" => $request->file_npwp,
                "file_laporan_kegiatan" => $request->file_laporan_kegiatan,
                "file_data_klien" => $request->file_data_klien,
                "foto_plang_yayasan" => $request->foto_plang_yayasan,
                "file_visi_misi" => $request->file_visi_misi,
                "file_proker" => $request->file_proker,
            ]);

            RevisiLogComment::create([
                "revisi_log_id" => $dataRevisi->id,
                "comment_data_umum" => $request->comment_data_umum,
                "comment_data_identitas" => $request->comment_data_identitas,
                "comment_data_legalitas" => $request->comment_data_legalitas,
                "comment_file_akta_pendirian" => $request->comment_file_akta_pendirian,
                "comment_file_izin_pendirian" => $request->comment_file_izin_pendirian,
                "comment_file_adart" => $request->comment_file_adart,
                "comment_file_susunan_pengurus" => $request->comment_file_susunan_pengurus,
                "comment_file_surat_domisili" => $request->comment_file_surat_domisili,
                "comment_file_npwp" => $request->comment_file_npwp,
                "comment_file_laporan_kegiatan" => $request->comment_file_laporan_kegiatan,
                "comment_file_data_klien" => $request->comment_file_data_klien,
                "comment_foto_plang_yayasan" => $request->comment_foto_plang_yayasan,
                "comment_file_visi_misi" => $request->comment_file_visi_misi,
                "comment_file_proker" => $request->comment_file_proker,
            ]);

            AdminPermohonanLog::create([
                'from_id' => $from_id,
                'user_id' => $request->user_id,
                'status_id' => $request->status_id,
            ]);
        });

        return redirect('/permohonan?type=diperiksa');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeRevisKadis(Request $request)
    {

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status_id' => 'required|exists:user_statuses,id',
            'catatan' => 'required',
        ]);


        DB::transaction(function () use ($request) {

            $from_id = Auth::user()->id;
            $now = Carbon::now();
            $nextWeek = Carbon::now();

            $user_id = $request->user_id;
            UserIdentity::where('user_id', $request->user_id)->update([
                'status_id' => $request->status_id,
                'tanggal_expire' => $nextWeek->addWeek(),
                'updated_at' => $now->toDateTimeString()
            ]);

            $data = User::select()->where('id', '=', $user_id)->first();


            $notifications =  [
                [
                    'from_id' => $from_id,
                    'to_id' => $user_id,
                    'status_id' => 1,
                    'message' => "Mohon maaf yayasan atas nama " . $data->name . " telah ditolak oleh Kepala Dinas Sosial Kota Bandung, silahkan lakukan permohonan kembali pada dokumen yang belum sesuai dan perhatikan catatan yang diberikan Kepala Dinas, serta ajukan permohonan kembali sebelum melewati tanggal " . Carbon::parse($nextWeek)->format('d/m/Y') . ".",
                ]
            ];
            Notification::insert($notifications);

            $dataRevisi = RevisiLog::create([
                "user_id" => $user_id,
                "data_umum" => 1,
                "data_identitas" => 1,
                "data_legalitas" => 1,
                "file_akta_pendirian" => 1,
                "file_izin_pendirian" => 1,
                "file_adart" => 1,
                "file_susunan_pengurus" => 1,
                "file_surat_domisili" => 1,
                "file_npwp" => 1,
                "file_laporan_kegiatan" => 1,
                "file_data_klien" => 1,
                "foto_plang_yayasan" => 1,
                "file_visi_misi" => 1,
                "file_proker" => 1,
            ]);

            RevisiLogComment::create([
                "revisi_log_id" => $dataRevisi->id,
                "comment_data_umum" => null,
                "comment_data_identitas" => null,
                "comment_data_legalitas" => null,
                "comment_file_akta_pendirian" => null,
                "comment_file_izin_pendirian" => null,
                "comment_file_adart" => null,
                "comment_file_susunan_pengurus" => null,
                "comment_file_surat_domisili" => null,
                "comment_file_npwp" => null,
                "comment_file_laporan_kegiatan" => null,
                "comment_file_data_klien" => null,
                "comment_foto_plang_yayasan" => null,
                "comment_file_visi_misi" => null,
                "comment_file_proker" => null,
                "comment_catatan" => $request->catatan,
            ]);

            AdminPermohonanLog::create([
                'from_id' => $from_id,
                'user_id' => $request->user_id,
                'status_id' => $request->status_id,
            ]);
        });

        return redirect('/permohonan?type=diperiksa');
    }
}
