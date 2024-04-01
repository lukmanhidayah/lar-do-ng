<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeActivityLogSeeder extends Seeder
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
                'name' => "Membuat Aktivitas Kegiatan"
            ],
            [
                "id" => 2,
                'name' => "Mengubah Aktivitas Kegiatan"
            ],
            [
                "id" => 3,
                'name' => "Menghapus Aktivitas Kegiatan"
            ],
        ];
        
        DB::table('type_activity_logs')->insert($userStatus);
    }
}
