<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userRoles = [
            [
                'id' => 1,
                'name' => "Admin"
            ],
            [
                "id" => 2,
                'name' => "Yayasan"
            ],
            [
                "id" => 3,
                'name' => "Kepala Dinas"
            ]
        ];
        DB::table('user_roles')->insert($userRoles);
    }
}
