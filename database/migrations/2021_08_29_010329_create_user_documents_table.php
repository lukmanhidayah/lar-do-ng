<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUserDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string("file_akta_pendirian", 255);
            $table->string("file_izin_pendirian", 255);
            $table->string("file_adart", 255);
            $table->string("file_susunan_pengurus", 255);
            $table->string("file_surat_domisili", 255);
            $table->string("file_npwp", 255);
            $table->string("file_laporan_kegiatan", 255);
            $table->string("file_data_klien", 255);
            $table->string("foto_plang_yayasan", 255);
            $table->string("file_visi_misi", 255);
            $table->string("file_proker", 255);
            $table->string("file_tanda_daftar_yayasan", 255)->nullable();
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
        Schema::dropIfExists('user_documents');
    }
}
