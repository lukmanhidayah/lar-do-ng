<?php

namespace Database\Seeders;

use App\Http\Controllers\RawDataGetter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KecamatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kecamatan = RawDataGetter::getKecamatan();

        // Insert Data to Database
        DB::table('kecamatans')->insert($kecamatan);
    }
}
