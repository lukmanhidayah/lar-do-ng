<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisiLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "user_id",
        "data_umum",
        "data_identitas",
        "data_legalitas",
        "file_akta_pendirian",
        "file_izin_pendirian",
        "file_adart",
        "file_susunan_pengurus",
        "file_surat_domisili",
        "file_npwp",
        "file_laporan_kegiatan",
        "file_data_klien",
        "foto_plang_yayasan",
        "file_visi_misi",
        "file_proker",
        'updated_at',
        'deleted_at'
    ];
}
