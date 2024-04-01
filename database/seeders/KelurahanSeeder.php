<?php

namespace Database\Seeders;

use App\Http\Controllers\RawDataGetter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelurahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kelurahans = RawDataGetter::getKelurahan();

        DB::transaction(function () use ($kelurahans) {
            $collection = collect($kelurahans);
            $parts = $collection->chunk(1000);

            foreach ($parts as $subset) {
                DB::table('kelurahans')->insert($subset->toArray());
            }
        });
    }
}
