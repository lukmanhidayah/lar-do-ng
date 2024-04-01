<?php

namespace Database\Seeders;

use App\Models\UserScope;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserRoleSeeder::class);
        $this->call(UserStatusSeeder::class);
        $this->call(ProvinsiSeeder::class);
        $this->call(KabupatenKotaSeeder::class);
        $this->call(KecamatanSeeder::class);
        $this->call(KelurahanSeeder::class);
        $this->call(TypeActivityLogSeeder::class);
        $this->call(BankSeeder::class);
        $this->call(UserPositionSeeder::class);
        $this->call(UserScopeSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(NotificationStatusSeeder::class);
        $this->call(UserTypeSeeder::class);
        $this->call(LksStatusSeeder::class);
        $this->call(TypeRehabSeeder::class);
        $this->call(ConsumerAppSeeder::class);
    }
}
