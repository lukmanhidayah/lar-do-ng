<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUserIdentitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_identities', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_handphone', 20);
            $table->string('no_reg', 50);
            $table->foreignId('status_id')->constrained('user_statuses')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('posisi_id')->nullable()->constrained("user_positions")->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('lks_status_id')->nullable()->constrained("lks_statuses")->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('type_rehab_id')->nullable()->constrained("type_rehabs")->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('type_id')->nullable()->constrained("user_types")->cascadeOnUpdate()->nullOnDelete(); //tipologi
            $table->foreignId('lingkup_id')->nullable()->constrained("user_scopes")->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('bank_id')->nullable()->constrained("banks")->cascadeOnUpdate()->nullOnDelete();


            $table->string("singkatan_yayasan", 50)->nullable();
            $table->string("website", 255)->nullable();
            $table->string("logo", 500)->nullable();
            $table->longText("visi")->nullable();
            $table->longText("misi")->nullable();
            $table->longText("tujuan")->nullable();
            $table->string("tempat_pendirian", 255)->nullable();
            $table->string("ketua", 125)->nullable();
            $table->string("sekretaris", 125)->nullable();
            $table->string("bendahara", 125)->nullable();
            $table->string("notaris", 125)->nullable();
            $table->string("nomor_akta", 100)->nullable();
            $table->string("nomor_pengesahan", 100)->nullable();
            $table->string("keterangan_domisili", 255)->nullable();
            $table->string("npwp", 125)->nullable();
            $table->string("nama_pemilik_rekening", 125)->nullable();
            $table->string("nomor_rekening", 50)->nullable();
            $table->string("fax", 20)->nullable();

            $table->dateTime("tanggal_pendirian")->nullable();
            $table->dateTime("tanggal_perpanjang")->nullable();
            $table->dateTime("tanggal_expire")->nullable();
            $table->dateTime("tanggal_akta")->nullable();

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
        Schema::dropIfExists('user_identities');
    }
}
