<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUserAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string("alamat", 255)->nullable();
            $table->string("rt", 3)->nullable();
            $table->string("rw", 3)->nullable();
            $table->foreignId('provinsi_id')->constrained('provinsis')->onDelete('cascade')->nullable();
            $table->foreignId('kabupaten_kota_id')->constrained('kabupaten_kotas')->onDelete('cascade')->nullable();

            $table->foreignId('kecamatan_id')->nullable()->constrained("kecamatans")->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('kelurahan_id')->nullable()->constrained("kelurahans")->cascadeOnUpdate()->nullOnDelete();
            
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
        Schema::dropIfExists('user_addresses');
    }
}
