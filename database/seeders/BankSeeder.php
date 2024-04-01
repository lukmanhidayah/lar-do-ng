<?php

namespace Database\Seeders;

use App\Http\Controllers\RawDataGetter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bank = RawDataGetter::getBank();

        // Insert Data to Database
        DB::table('banks')->insert($bank);
    }
}
