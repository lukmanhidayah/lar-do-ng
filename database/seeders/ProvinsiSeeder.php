<?php

namespace Database\Seeders;

use App\Http\Controllers\RawDataGetter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinsiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provinsi = RawDataGetter::getProvinsi();

        // Insert Data to Database
        DB::table('provinsis')->insert($provinsi);
    }
}
