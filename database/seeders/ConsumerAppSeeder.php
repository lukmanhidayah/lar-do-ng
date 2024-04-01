<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConsumerAppSeeder extends Seeder
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
                'username' => 'sipelaku',
                'password' => 'd1ns0sBDG2020',
                'description' => "Aplikasi pengelolaan yayasan Dinas Sosial Kota Bandung",
            ],
        ];

        DB::table('consumer_apps')->insert($userStatus);
    }
}
