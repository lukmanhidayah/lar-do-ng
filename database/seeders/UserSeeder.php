<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            [
                'email' => "lukmanhidayah01@gmail.com",
                'name' => "Administrator",
                'email_verified_at' => new Carbon(),
                'url_slug' => 'administrator_dinas_sosial_bdg',
                'user_role_id' => '1',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ],
            [
                'email' => "kadis@gmail.com",
                'name' => "Kadis",
                'url_slug' => 'kepala_dinas_sosial_bdg',
                'email_verified_at' => new Carbon(),
                'user_role_id' => '3',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]
        ];
        DB::table('users')->insert($user);
    }
}
