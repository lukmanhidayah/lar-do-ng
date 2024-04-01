<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisiLogComment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "revisi_log_id",
        "comment_data_umum",
        "comment_data_identitas",
        "comment_data_legalitas",
        "comment_file_akta_pendirian",
        "comment_file_izin_pendirian",
        "comment_file_adart",
        "comment_file_susunan_pengurus",
        "comment_file_surat_domisili",
        "comment_file_npwp",
        "comment_file_laporan_kegiatan",
        "comment_file_data_klien",
        "comment_foto_plang_yayasan",
        "comment_file_visi_misi",
        "comment_file_proker",
        "comment_catatan",
        'updated_at',
        'deleted_at'
    ];
}
