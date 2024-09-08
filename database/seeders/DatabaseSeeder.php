<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Photo;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(Organization_User_RolesSeeder::class);

        $users = \App\Models\User::factory()->count(20)->create();

        Organization::factory()
            ->count(10)
            ->create()
            ->each(function ($organization) {
                Photo::factory()
                    ->for($organization, 'organization') // Link to the organization
                    ->portrait()  // Create portrait photo
                    ->count(1)
                    ->create();

                Photo::factory()
                    ->for($organization, 'organization')
                    ->count(3)  // 9 landscape photos
                    ->create();
            });
    }
}
