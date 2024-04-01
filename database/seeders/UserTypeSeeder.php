<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userType = [
            [
                'id' => 1,
                'name' => "A",
                "desc" => "Mandiri"
            ],
            [
                "id" => 2,
                'name' => "B",
                "desc" => "Berkembang"
            ],
            [
                "id" => 3,
                'name' => "C",
                "desc" => "Tumbuh"
            ],
            [
                "id" => 4,
                'name' => "D",
                "desc" => "Embrio"
            ]
        ];
        
        DB::table('user_types')->insert($userType);
    }
}
