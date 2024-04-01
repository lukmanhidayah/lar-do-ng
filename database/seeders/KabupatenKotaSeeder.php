<?php

namespace Database\Seeders;

use App\Http\Controllers\RawDataGetter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KabupatenKotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kabupaten_kota = RawDataGetter::getKabupatenKota();

        // Insert Data to Database
        DB::table('kabupaten_kotas')->insert($kabupaten_kota);
    }
}
