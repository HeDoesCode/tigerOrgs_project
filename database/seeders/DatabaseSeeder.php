<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Photo;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Database\Seeders\Organization_User_RolesSeeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\UsersSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        // $this->call(Organization_User_RolesSeeder::class);

        // $users = \App\Models\User::factory()->count(20)->create();
        // $userCount;
        // $orgCount;

        $organizations = Organization::factory()
            ->count(120)
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

        /**
         * create 1996 users (4 from seeders totaling to 2000)
         * 4-1500 are students randomly assigned to orgs
         * 1501 - 2000 are admins randomly assigned to orgs
         */

        $users = User::factory()->count(1996)->create();
        $userIDs = $users->pluck('userID')->toArray();
        shuffle($userIDs);

        // Assign 4-1500 users as students
        $students = array_slice($userIDs, 0, rand(4, 1500));

        // Assign remaining 1501-2000 users as admins
        $admins = array_slice($userIDs, count($students), rand(1501, 2000) - count($students));


        $studentRecords = [];
        foreach ($organizations as $organization) {
            foreach ($students as $studentID) {
                $studentRecords[] = [
                    'orgID' => $organization->orgID,
                    'userID' => $studentID,
                    'roleID' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        DB::table('organization_user_role')->insert($studentRecords);

        // Insert admin-role records
        $adminRecords = [];
        foreach ($organizations as $organization) {
            foreach ($admins as $adminID) {
                $adminRecords[] = [
                    'orgID' => $organization->orgID,
                    'userID' => $adminID,
                    'roleID' => 2,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        DB::table('organization_user_role')->insert($adminRecords);
    }
}
