<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserScopeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userScopes = [
            [
                'id' => 1,
                'name' => "Nasional"
            ],
            [
                'id' => 2,
                'name' => "Provinsi"
            ],
            [
                "id" => 3,
                'name' => "Kabupaten/Kota"
            ]
        ];
        DB::table('user_scopes')->insert($userScopes);
    }
}
