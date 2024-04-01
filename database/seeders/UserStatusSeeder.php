<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userStatus = [
            [
                'id' => 1,
                'name' => "Belum Memohon"
            ],
            [
                "id" => 2,
                'name' => "Memohon"
            ],
            [
                "id" => 3,
                'name' => "Verifikasi Admin"
            ],
            [
                "id" => 4,
                'name' => "Revisi"
            ],
            [
                "id" => 5,
                'name' => "Disetujui"
            ],
            [
                "id" => 6,
                'name' => "Non Aktif"
            ]
        ];
        
        DB::table('user_statuses')->insert($userStatus);
    }
}
