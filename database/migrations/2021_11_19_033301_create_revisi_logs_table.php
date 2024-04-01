<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateRevisiLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revisi_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->char('data_umum', 2);
            $table->char('data_identitas', 2);
            $table->char('data_legalitas', 2);
            $table->char('file_akta_pendirian', 2);
            $table->char('file_izin_pendirian', 2);
            $table->char('file_adart', 2);
            $table->char('file_susunan_pengurus', 2);
            $table->char('file_surat_domisili', 2);
            $table->char('file_npwp', 2);
            $table->char('file_laporan_kegiatan', 2);
            $table->char('file_data_klien', 2);
            $table->char('foto_plang_yayasan', 2);
            $table->char('file_visi_misi', 2);
            $table->char('file_proker', 2);
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revisi_logs');
    }
}
