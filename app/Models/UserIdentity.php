<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserIdentity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "nomor_handphone",
        "user_id",
        "status_id",
        "no_reg",

        "singkatan_yayasan",

        "fax",
        "website",
        "logo",
        "visi",
        "misi",
        "tujuan",
        "posisi_id",
        "type_id",
        "type_rehab_id",
        "lks_status_id",
        "lingkup_id",
        "tempat_pendirian",
        "tanggal_pendirian",
        "tanggal_perpanjang",
        "tanggal_expire",
        "ketua",
        "sekretaris",
        "bendahara",
        "notaris",
        "tanggal_akta",
        "nomor_akta",
        "nomor_pengesahan",
        "keterangan_domisili",
        "npwp",
        "bank_id",
        "nomor_rekening",
        "nama_pemilik_rekening",

        "updated_at",
        "deleted_at"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function statusLks()
    {
        return $this->belongsTo(UserStatus::class);
    }
}
