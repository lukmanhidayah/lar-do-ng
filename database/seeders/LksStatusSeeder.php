<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LksStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lksStatus = [
            [
                'id' => 1,
                'name' => "Lokal"
            ],
            [
                "id" => 2,
                'name' => "Asing"
            ]
        ];
        
        DB::table('lks_statuses')->insert($lksStatus);
    }
}
