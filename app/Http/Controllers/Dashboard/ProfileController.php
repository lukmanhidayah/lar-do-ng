<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\Kecamatan;
use App\Models\LksStatus;
use App\Models\Notification;
use App\Models\PermohonanLog;
use App\Models\RevisiLog;
use App\Models\TypeRehab;
use App\Models\User;
use App\Models\UserActivity;
use App\Models\UserAddress;
use App\Models\UserDocument;
use App\Models\UserIdentity;
use App\Models\UserPosition;
use App\Models\UserScope;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $address = UserAddress::select(
            "user_addresses.id as id",
            "user_addresses.alamat as alamat",
            "user_addresses.provinsi_id as provinsi_id",
            "user_addresses.kabupaten_kota_id as kabupaten_kota_id",
            "user_addresses.kecamatan_id as kecamatan_id",
            "user_addresses.kelurahan_id as kelurahan_id",
            "user_addresses.rt as rt",
            "user_addresses.rw as rw",
            "kecamatans.name as kecamatan_label",
            "kelurahans.name as kelurahan_label"
        )
            ->leftJoin("kecamatans", "kecamatans.id", "=", "kecamatan_id")
            ->leftJoin("kelurahans", "kelurahans.id", "=", "kelurahan_id")
            ->where('user_id', Auth::user()->id)
            ->first();

        $identity = UserIdentity::select(
            "*",
            "user_positions.name as posisi_label",
            "user_scopes.name as lingkup_label",
            "lks_statuses.name as lks_status_label",
            "type_rehabs.name as type_rehab_label",
            "banks.name as bank_label",
        )
            ->leftJoin("user_positions", "user_positions.id", "=", "posisi_id")
            ->leftJoin("user_scopes", "user_scopes.id", "=", "lingkup_id")
            ->leftJoin("banks", "banks.id", "=", "bank_id")
            ->leftJoin("type_rehabs", "type_rehabs.id", "=", "type_rehab_id")
            ->leftJoin("lks_statuses", "lks_statuses.id", "=", "lks_status_id")
            ->where('user_id', Auth::user()->id)->first();

        $comment = RevisiLog::select(
            "revisi_log_comments.comment_data_umum as comment_data_umum",
            "revisi_log_comments.comment_data_identitas as comment_data_identitas",
            "revisi_log_comments.comment_data_legalitas as comment_data_legalitas",
            "revisi_log_comments.comment_file_akta_pendirian as comment_file_akta_pendirian",
            "revisi_log_comments.comment_file_izin_pendirian as comment_file_izin_pendirian",
            "revisi_log_comments.comment_file_adart as comment_file_adart",
            "revisi_log_comments.comment_file_susunan_pengurus as comment_file_susunan_pengurus",
            "revisi_log_comments.comment_file_surat_domisili as comment_file_surat_domisili",
            "revisi_log_comments.comment_file_npwp as comment_file_npwp",
            "revisi_log_comments.comment_file_laporan_kegiatan as comment_file_laporan_kegiatan",
            "revisi_log_comments.comment_file_data_klien as comment_file_data_klien",
            "revisi_log_comments.comment_foto_plang_yayasan as comment_foto_plang_yayasan",
            "revisi_log_comments.comment_file_visi_misi as comment_file_visi_misi",
            "revisi_log_comments.comment_file_proker as comment_file_proker",
            "revisi_log_comments.comment_catatan as comment_catatan",
        )
            ->leftJoin(
                "revisi_log_comments",
                "revisi_log_comments.revisi_log_id",
                "=",
                "revisi_logs.id"
            )
            ->where('user_id', Auth::user()->id)->orderBy("revisi_logs.created_at", "DESC")
            ->first();

        return Inertia::render('User/Profile', [
            "totalNotify" => $totalNotify,
            'identity' => $identity,
            'kecamatans' => $this->mymapper(Kecamatan::where('kabupatan_kota_id', 3273)->orderBy("name", "ASC")->get(),  function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            }),
            'banks' => $this->mymapper(Bank::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => $value->name
                ];
            }),
            'positions' => $this->mymapper(UserPosition::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            }),
            'scopes' => $this->mymapper(UserScope::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            }),
            'lksStatus' => $this->mymapper(LksStatus::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            }),
            'typeRehabs' => $this->mymapper(TypeRehab::get(), function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            }),
            'document' => UserDocument::where('user_id', Auth::user()->id)->first(),
            'address' => $address,
            'comment' => $comment,
            'activities' => UserActivity::where('user_id', Auth::user()->id)->skip(0)
                ->take(3)->orderBy("user_activities.created_at", "DESC")->get(),
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
    public function store(Request $request)
    {
        $request->validate([
            'singkatan_yayasan' => 'required|string|max:10',
            'alamat' => 'required|string|max:255',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
            'fax' => 'nullable|numeric',
            'webiste' => 'nullable|regex:/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi',
            'visi' => 'required',
            'misi' => 'required',
            'tujuan' => 'required',
            'posisi_id' => 'required|exists:user_positions,id',
            'lingkup_id' => 'required|exists:user_scopes,id',
            'type_rehab_id' => 'required|exists:type_rehabs,id',
            'lks_status_id' => 'required|exists:lks_statuses,id',
            'tempat_pendirian' => 'required',
            'tanggal_pendirian' => 'required|date',
            'ketua' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'sekretaris' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'bendahara' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'notaris' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'tanggal_akta' => 'required|date',
            'nomor_akta' => 'required',
            'nomor_pengesahan' => 'required',
            'keterangan_domisili' => 'required|string|max:255',
            'npwp' => 'required',

            'logo' => 'required|mimes:jpg,jpeg,png|max:5120',
            'file_akta_pendirian' => 'required|mimes:pdf|max:20480',
            'file_izin_pendirian' => 'required|mimes:pdf|max:5120',
            'file_adart' => 'required|mimes:pdf|max:5120',
            'file_susunan_pengurus' => 'required|mimes:pdf|max:5120',
            'file_surat_domisili' => 'required|mimes:pdf|max:5120',
            'file_npwp' => 'required|mimes:pdf|max:5120',
            'file_laporan_kegiatan' => 'required|mimes:pdf|max:5120',
            'file_data_klien' => 'required|mimes:pdf|max:5120',
            'foto_plang_yayasan' => 'required|mimes:jpg,jpeg,png|max:5120',
            'file_visi_misi' => 'required|mimes:pdf|max:5120',
            'file_proker' => 'required|mimes:pdf|max:5120',
        ]);

        DB::transaction(function () use ($request) {

            $user_id = Auth::user()->id;

            $now = Carbon::now();
            $nextWeek = Carbon::now();

            User::where('id', $user_id)->update([
                'updated_at' => $now->toDateTimeString()
            ]);

            $userIdentity = tap(UserIdentity::where('user_id', $user_id)->first());



            $userIdentityBefore = $userIdentity->first();

            PermohonanLog::insert(
                [
                    'user_id' => $user_id,
                    'status_id' => 2,
                    'from_status_id' => $userIdentityBefore->status_id,
                ]
            );

            // update useridentity
            $updateUserIdentity = $userIdentity->update([
                'singkatan_yayasan' => $request->singkatan_yayasan,
                'fax' => $request->fax,
                'status_id' => 2,
                'website' => $request->webiste,
                'visi' => $request->visi,
                'misi' => $request->misi,
                'tujuan' => $request->tujuan,
                'posisi_id' => $request->posisi_id,
                'lingkup_id' => $request->lingkup_id,
                'type_rehab_id' => $request->type_rehab_id,
                'lks_status_id' => $request->lks_status_id,
                'tempat_pendirian' => $request->tempat_pendirian,
                'tanggal_pendirian' => new Carbon($request->tanggal_pendirian),
                'tanggal_expire' => $nextWeek->addYear(),
                'ketua' => $request->ketua,
                'sekretaris' => $request->sekretaris,
                'bendahara' => $request->bendahara,
                'notaris' => $request->notaris,
                'tanggal_akta' => new Carbon($request->tanggal_akta),
                'nomor_akta' => $request->nomor_akta,
                'nomor_pengesahan' => $request->nomor_pengesahan,
                'keterangan_domisili' => $request->keterangan_domisili,
                'npwp' => $request->npwp,
                'bank_id' => $request->bank_id,
                'nomor_rekening' => $request->nomor_rekening,
                'nama_pemilik_rekening' => $request->nama_pemilik_rekening,
                'updated_at' => $now->toDateTimeString()
            ])->first();

            // namomg for logo
            $manipulateName = str_replace(' ', '_', strtolower(Auth::user()->name));

            $fileName = 'logo_' . $manipulateName . '.' . $request->logo->extension();
            $request->file('logo')->storeAs('uploads/' . $manipulateName, $fileName, 'public');

            UserIdentity::where('user_id', $user_id)->update([
                'logo' => $manipulateName . "/" .  $fileName
            ]);

            // update user address
            UserAddress::where('user_id', $user_id)->update([
                'alamat' => $request->alamat,
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
                'rt' => $request->rt,
                'rw' => $request->rw,
                'updated_at' => $now->toDateTimeString()
            ]);

            Notification::create([
                'from_id' => $user_id,
                'to_id' => 1,
                'status_id' => 1,
                'message' => "Yayasan atas nama " . $request->name . " telah mengisi persyaratan sekaligus melakuakan permohonan untuk verifikasi, silahkan kepada Admin untuk melakukan verifikasi dan home visit untuk memastikan kebenaran data.",
            ]);


            // naming file
            $nameFileAktaPendirian = "file_akta_pendirian_" . $manipulateName . '.' . $request->file_akta_pendirian->extension();
            $nameFileIzinPendirian = "file_izin_pendirian_" . $manipulateName . '.' . $request->file_izin_pendirian->extension();
            $nameFileAdart = "file_adart_" . $manipulateName . '.' . $request->file_adart->extension();
            $nameFileSusunanPengurus = "file_susunan_pengurus_" . $manipulateName . '.' . $request->file_susunan_pengurus->extension();
            $nameFileSuratDomisili = "file_surat_domisili_" . $manipulateName . '.' . $request->file_surat_domisili->extension();
            $nameFileNpwp = "file_npwp_" . $manipulateName . '.' . $request->file_npwp->extension();
            $nameFileLaporanKegiatan = "file_laporan_kegiatan_" . $manipulateName . '.' . $request->file_laporan_kegiatan->extension();
            $nameFileDataKlien = "file_data_klien_" . $manipulateName . '.' . $request->file_data_klien->extension();
            $nameFotoPlangYayasan = "foto_plang_yayasan_" . $manipulateName . '.' . $request->foto_plang_yayasan->extension();
            $nameFileVisiMisi = "file_visi_misi_" . $manipulateName . '.' . $request->file_visi_misi->extension();
            $nameFileProker = "file_proker_" . $manipulateName . '.' . $request->file_proker->extension();

            $request->file('file_akta_pendirian')->storeAs('uploads/' . $manipulateName, $nameFileAktaPendirian, 'public');
            $request->file('file_izin_pendirian')->storeAs('uploads/' . $manipulateName, $nameFileIzinPendirian, 'public');
            $request->file('file_adart')->storeAs('uploads/' . $manipulateName, $nameFileAdart, 'public');
            $request->file('file_susunan_pengurus')->storeAs('uploads/' . $manipulateName, $nameFileSusunanPengurus, 'public');
            $request->file('file_surat_domisili')->storeAs('uploads/' . $manipulateName, $nameFileSuratDomisili, 'public');
            $request->file('file_npwp')->storeAs('uploads/' . $manipulateName, $nameFileNpwp, 'public');
            $request->file('file_laporan_kegiatan')->storeAs('uploads/' . $manipulateName, $nameFileLaporanKegiatan, 'public');
            $request->file('file_data_klien')->storeAs('uploads/' . $manipulateName, $nameFileDataKlien, 'public');
            $request->file('foto_plang_yayasan')->storeAs('uploads/' . $manipulateName, $nameFotoPlangYayasan, 'public');
            $request->file('file_visi_misi')->storeAs('uploads/' . $manipulateName, $nameFileVisiMisi, 'public');
            $request->file('file_proker')->storeAs('uploads/' . $manipulateName, $nameFileProker, 'public');




            UserDocument::updateOrCreate([
                'user_id' => Auth::user()->id,
            ], [
                'file_akta_pendirian' => $manipulateName . "/" . $nameFileAktaPendirian,
                'file_izin_pendirian' => $manipulateName . "/" . $nameFileIzinPendirian,
                'file_adart' => $manipulateName . "/" . $nameFileAdart,
                'file_susunan_pengurus' => $manipulateName . "/" . $nameFileSusunanPengurus,
                'file_surat_domisili' => $manipulateName . "/" . $nameFileSuratDomisili,
                'file_npwp' => $manipulateName . "/" . $nameFileNpwp,
                'file_laporan_kegiatan' => $manipulateName . "/" . $nameFileLaporanKegiatan,
                'file_data_klien' => $manipulateName . "/" . $nameFileDataKlien,
                'foto_plang_yayasan' => $manipulateName . "/" . $nameFotoPlangYayasan,
                'file_visi_misi' => $manipulateName . "/" . $nameFileVisiMisi,
                'file_proker' => $manipulateName . "/" . $nameFileProker,
            ]);
        });

        return back();
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function edit(Request $request)
    {
        $request->validate([
            'singkatan_yayasan' => 'required|string|max:10',
            'alamat' => 'required|string|max:255',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
            'fax' => 'nullable|numeric',
            'webiste' => 'nullable|regex:/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi',
            'visi' => 'required',
            'misi' => 'required',
            'tujuan' => 'required',
            'posisi_id' => 'required|exists:user_positions,id',
            'lingkup_id' => 'required|exists:user_scopes,id',
            'type_rehab_id' => 'required|exists:type_rehabs,id',
            'lks_status_id' => 'required|exists:lks_statuses,id',
            'tempat_pendirian' => 'required',
            'tanggal_pendirian' => 'required|date',
            'ketua' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'sekretaris' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'bendahara' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'notaris' => 'required|string|max:125|regex:/^[a-zA-Z. ,]+$/',
            'tanggal_akta' => 'required|date',
            'nomor_akta' => 'required',
            'nomor_pengesahan' => 'required',
            'keterangan_domisili' => 'required|string|max:255',
            'npwp' => 'required',

            'logo' => $request->is_change_logo == true ? 'required|mimes:jpg,jpeg,png|max:5120' : '',
            'file_akta_pendirian' => $request->is_change_file_akta_pendirian == true ? 'required|mimes:pdf|max:20480' : '',
            'file_izin_pendirian' => $request->is_change_file_izin_pendirian == true ? 'required|mimes:pdf|max:5120' : '',
            'file_adart' => $request->is_change_file_adart == true ? 'required|mimes:pdf|max:5120' : '',
            'file_susunan_pengurus' => $request->is_change_file_susunan_pengurus == true ? 'required|mimes:pdf|max:5120' : '',
            'file_surat_domisili' => $request->is_change_file_surat_domisili == true ? 'required|mimes:pdf|max:5120' : '',
            'file_npwp' => $request->is_change_file_npwp == true ? 'required|mimes:pdf|max:5120' : '',
            'file_laporan_kegiatan' => $request->is_change_file_laporan_kegiatan == true ? 'required|mimes:pdf|max:5120' : '',
            'file_data_klien' => $request->is_change_file_data_klien == true ? 'required|mimes:pdf|max:5120' : '',
            'foto_plang_yayasan' => $request->is_change_foto_plang_yayasan == true ? 'required|mimes:jpg,jpeg,png|max:5120' : '',
            'file_visi_misi' => $request->is_change_file_visi_misi == true ? 'required|mimes:pdf|max:5120' : '',
            'file_proker' => $request->is_change_file_proker == true ? 'required|mimes:pdf|max:5120' : '',
        ]);

        DB::transaction(function () use ($request) {

            $user_id = Auth::user()->id;

            $now = Carbon::now();
            $nextWeek = Carbon::now();

            User::where('id', $user_id)->update([
                'updated_at' => $now->toDateTimeString()
            ]);

            $userIdentity = tap(UserIdentity::where('user_id', $user_id)->first());



            $userIdentityBefore = $userIdentity->first();

            PermohonanLog::insert(
                [
                    'user_id' => $user_id,
                    'status_id' => 2,
                    'from_status_id' => $userIdentityBefore->status_id,
                ]
            );

            // update useridentity
            $updateUserIdentity = $userIdentity->update([
                'singkatan_yayasan' => $request->singkatan_yayasan,
                'fax' => $request->fax,
                'status_id' => 2,
                'website' => $request->webiste,
                'visi' => $request->visi,
                'misi' => $request->misi,
                'tujuan' => $request->tujuan,
                'posisi_id' => $request->posisi_id,
                'lingkup_id' => $request->lingkup_id,
                'type_rehab_id' => $request->type_rehab_id,
                'lks_status_id' => $request->lks_status_id,
                'tempat_pendirian' => $request->tempat_pendirian,
                'tanggal_pendirian' => new Carbon($request->tanggal_pendirian),
                'tanggal_expire' => $nextWeek->addYear(),
                'ketua' => $request->ketua,
                'sekretaris' => $request->sekretaris,
                'bendahara' => $request->bendahara,
                'notaris' => $request->notaris,
                'tanggal_akta' => new Carbon($request->tanggal_akta),
                'nomor_akta' => $request->nomor_akta,
                'nomor_pengesahan' => $request->nomor_pengesahan,
                'keterangan_domisili' => $request->keterangan_domisili,
                'npwp' => $request->npwp,
                'bank_id' => $request->bank_id,
                'nomor_rekening' => $request->nomor_rekening,
                'nama_pemilik_rekening' => $request->nama_pemilik_rekening,
                'updated_at' => $now->toDateTimeString()
            ])->first();

            // namomg for logo
            $manipulateName = str_replace(' ', '_', strtolower(Auth::user()->name));

            // change logo if is change 
            if ($request->is_change_logo == true) {
                $fileName = 'logo_' . $manipulateName . '.' . $request->logo->extension();
                $request->file('logo')->storeAs('uploads/' . $manipulateName, $fileName, 'public');

                UserIdentity::where('user_id', $user_id)->update([
                    'logo' => $manipulateName . "/" .  $fileName
                ]);
            }

            // update user address
            UserAddress::where('user_id', $user_id)->update([
                'alamat' => $request->alamat,
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
                'rt' => $request->rt,
                'rw' => $request->rw,
                'updated_at' => $now->toDateTimeString()
            ]);

            Notification::create([
                'from_id' => $user_id,
                'to_id' => 1,
                'status_id' => 1,
                'message' => "Yayasan atas nama " . $request->name . " telah mengisi persyaratan sekaligus melakuakan permohonan untuk verifikasi, silahkan kepada Admin untuk melakukan verifikasi dan home visit untuk memastikan kebenaran data.",
            ]);


            // naming file

            if ($request->is_change_file_akta_pendirian == true) {
                $nameFileAktaPendirian = "file_akta_pendirian_" . $manipulateName . '.' . $request->file_akta_pendirian->extension();
                $request->file('file_akta_pendirian')->storeAs('uploads/' . $manipulateName, $nameFileAktaPendirian, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_akta_pendirian' => $manipulateName . "/" . $nameFileAktaPendirian
                ]);
            }

            if ($request->is_change_file_izin_pendirian == true) {
                $nameFileIzinPendirian = "file_izin_pendirian_" . $manipulateName . '.' . $request->file_izin_pendirian->extension();
                $request->file('file_izin_pendirian')->storeAs('uploads/' . $manipulateName, $nameFileIzinPendirian, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_izin_pendirian' => $manipulateName . "/" . $nameFileIzinPendirian,
                ]);
            }

            if ($request->is_change_file_adart == true) {
                $nameFileAdart = "file_adart_" . $manipulateName . '.' . $request->file_adart->extension();
                $request->file('file_adart')->storeAs('uploads/' . $manipulateName, $nameFileAdart, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_adart' => $manipulateName . "/" . $nameFileAdart
                ]);
            }
            if ($request->is_change_file_susunan_pengurus == true) {
                $nameFileSusunanPengurus = "file_susunan_pengurus_" . $manipulateName . '.' . $request->file_susunan_pengurus->extension();
                $request->file('file_susunan_pengurus')->storeAs('uploads/' . $manipulateName, $nameFileSusunanPengurus, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_susunan_pengurus' => $manipulateName . "/" . $nameFileSusunanPengurus,
                ]);
            }
            if ($request->is_change_file_surat_domisili == true) {
                $nameFileSuratDomisili = "file_surat_domisili_" . $manipulateName . '.' . $request->file_surat_domisili->extension();
                $request->file('file_surat_domisili')->storeAs('uploads/' . $manipulateName, $nameFileSuratDomisili, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_surat_domisili' => $manipulateName . "/" . $nameFileSuratDomisili
                ]);
            }
            if ($request->is_change_file_npwp == true) {
                $nameFileNpwp = "file_npwp_" . $manipulateName . '.' . $request->file_npwp->extension();
                $request->file('file_npwp')->storeAs('uploads/' . $manipulateName, $nameFileNpwp, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_npwp' => $manipulateName . "/" . $nameFileNpwp,
                ]);
            }
            if ($request->is_change_file_laporan_kegiatan == true) {
                $nameFileLaporanKegiatan = "file_laporan_kegiatan_" . $manipulateName . '.' . $request->file_laporan_kegiatan->extension();
                $request->file('file_laporan_kegiatan')->storeAs('uploads/' . $manipulateName, $nameFileLaporanKegiatan, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_laporan_kegiatan' => $manipulateName . "/" . $nameFileLaporanKegiatan,
                ]);
            }
            if ($request->is_change_file_data_klien == true) {
                $nameFileDataKlien = "file_data_klien_" . $manipulateName . '.' . $request->file_data_klien->extension();
                $request->file('file_data_klien')->storeAs('uploads/' . $manipulateName, $nameFileDataKlien, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_data_klien' => $manipulateName . "/" . $nameFileDataKlien
                ]);
            }
            if ($request->is_change_foto_plang_yayasan == true) {
                $nameFotoPlangYayasan = "foto_plang_yayasan_" . $manipulateName . '.' . $request->foto_plang_yayasan->extension();
                $request->file('foto_plang_yayasan')->storeAs('uploads/' . $manipulateName, $nameFotoPlangYayasan, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'foto_plang_yayasan' => $manipulateName . "/" . $nameFotoPlangYayasan,
                ]);
            }
            if ($request->is_change_file_visi_misi == true) {
                $nameFileVisiMisi = "file_visi_misi_" . $manipulateName . '.' . $request->file_visi_misi->extension();
                $request->file('file_visi_misi')->storeAs('uploads/' . $manipulateName, $nameFileVisiMisi, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_visi_misi' => $manipulateName . "/" . $nameFileVisiMisi,
                ]);
            }
            if ($request->is_change_file_proker == true) {
                $nameFileProker = "file_proker_" . $manipulateName . '.' . $request->file_proker->extension();
                $request->file('file_proker')->storeAs('uploads/' . $manipulateName, $nameFileProker, 'public');
                UserDocument::updateOrCreate([
                    'user_id' => Auth::user()->id,
                ], [
                    'file_proker' => $manipulateName . "/" . $nameFileProker,
                ]);
            }
        });

        return back();
    }
}
