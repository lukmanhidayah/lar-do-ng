<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeRehabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $typeRehabs = [
            [
                'id' => 1,
                'name' => "penyandang cacat fisik"
            ],
            [
                "id" => 2,
                'name' => "penyandang cacat mental"
            ],
            [
                "id" => 3,
                'name' => "penyandang cacat fisik dan mental"
            ],
            [
                "id" => 4,
                'name' => "tuna susila"
            ],
            [
                "id" => 5,
                'name' => "gelandangan"
            ],
            [
                "id" => 6,
                'name' => "pengemis"
            ],
            [
                "id" => 7,
                'name' => "eks penderita penyakit kronis"
            ],
            [
                "id" => 8,
                'name' => "eks narapidana"
            ],
            [
                "id" => 9,
                'name' => "eks pencandu narkotika"
            ],
            [
                "id" => 10,
                'name' => "eks psikotik"
            ],
            [
                "id" => 11,
                'name' => "pengguna psikotropika sindroma ketergantungan"
            ],
            [
                "id" => 12,
                'name' => "orang dengan Human Immunodeficiency Virus/Acquired Immuno, Deficiency Syndrome"
            ],
            [
                "id" => 13,
                'name' => "korban tindak kekerasan"
            ],
            [
                "id" => 14,
                'name' => "korban bencana"
            ],
            [
                "id" => 15,
                'name' => "korban perdagangan orang"
            ],
            [
                "id" => 16,
                'name' => "anak terlantar"
            ],
            [
                "id" => 17,
                'name' => "anak dengan kebutuhan khusus"
            ]
        ];

        DB::table('type_rehabs')->insert($typeRehabs);
    }
}
