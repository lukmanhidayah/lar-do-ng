<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateRevisiLogCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revisi_log_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('revisi_log_id')->constrained('revisi_logs')->onDelete('cascade');
            $table->text('comment_data_umum')->nullable();
            $table->text('comment_data_identitas')->nullable();
            $table->text('comment_data_legalitas')->nullable();
            $table->text('comment_file_akta_pendirian')->nullable();
            $table->text('comment_file_izin_pendirian')->nullable();
            $table->text('comment_file_adart')->nullable();
            $table->text('comment_file_susunan_pengurus')->nullable();
            $table->text('comment_file_surat_domisili')->nullable();
            $table->text('comment_file_npwp')->nullable();
            $table->text('comment_file_laporan_kegiatan')->nullable();
            $table->text('comment_file_data_klien')->nullable();
            $table->text('comment_foto_plang_yayasan')->nullable();
            $table->text('comment_file_visi_misi')->nullable();
            $table->text('comment_file_proker')->nullable();
            $table->text('comment_catatan')->nullable();
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
        Schema::dropIfExists('revisi_log_comments');
    }
}
