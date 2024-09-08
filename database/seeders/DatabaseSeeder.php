<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Photo;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Organization;
use Illuminate\Database\Seeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\UsersSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use GrahamCampbell\ResultType\Success;
use Database\Seeders\Organization_User_RolesSeeder;

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

        // try {
        $users = User::factory()->count(1996)->create();
        //     die('User creation successful');
        // } catch (\Exception $e) {
        //     // Log::error('User creation failed: ' . $e->getMessage());
        //     die('Caught Error: ' . $e->getMessage());
        // }

        $userIDs = $users->pluck('userID')->toArray();
        shuffle($userIDs);

        // Assign 4-1500 users as students
        $students = array_slice($userIDs, 0, rand(4, 1500));

        // Assign remaining 1501-2000 users as admins
        $admins = array_slice($userIDs, count($students), rand(1501, 2000) - count($students));


        $studentRecords = [];
        $organizationIDs = $organizations->pluck('orgID')->toArray();  // Get all organization IDs

        foreach ($students as $studentID) {
            $randomOrgID = $organizationIDs[array_rand($organizationIDs)];  // Randomly select an organization ID
            $studentRecords[] = [
                'orgID' => $randomOrgID,
                'userID' => $studentID,
                'roleID' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert student-role records in chunks
        foreach (array_chunk($studentRecords, 500) as $chunk) {
            DB::table('organization_user_role')->insert($chunk);
        }

        // Insert admin-role records
        $adminRecords = [];
        $organizationIDs = $organizations->pluck('orgID')->toArray();  // Get all organization IDs

        foreach ($admins as $adminID) {
            $randomOrgID = $organizationIDs[array_rand($organizationIDs)];  // Randomly select an organization ID
            $adminRecords[] = [
                'orgID' => $randomOrgID,
                'userID' => $adminID,
                'roleID' => 2,
            ];
        }

        // Insert admin-role records in chunks
        foreach (array_chunk($adminRecords, 500) as $chunk) {
            DB::table('organization_user_role')->insert($chunk);
        }

        // DB::table('users')->insert([
        //     'userID' => '2024999999',
        //     'email' => 'super.admin@ust.edu.ph',
        //     'firstname' => 'super',
        //     'lastname' => 'admin',
        //     'college' => 'College of Information and Computing Sciences',
        //     'status' => 'student',
        // ]);
    }
}
