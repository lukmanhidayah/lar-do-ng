<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userPositions = [
            [
                'id' => 1,
                'name' => "LKS Pusat"
            ],
            [
                "id" => 2,
                'name' => "LKS Cabang"
            ]
        ];
        DB::table('user_positions')->insert($userPositions);
    }
}
