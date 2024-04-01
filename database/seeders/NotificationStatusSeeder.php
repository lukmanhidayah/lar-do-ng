<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $notificationStatus = [
            [
                'id' => 1,
                'name' => "Dikirim"
            ],
            [
                "id" => 2,
                'name' => "Dibaca"
            ],
            [
                "id" => 3,
                'name' => "Dihapus"
            ]
        ];

        DB::table('notification_statuses')->insert($notificationStatus);
    }
}
