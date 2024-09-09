<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Photo;
use App\Models\Contact;
use App\Models\Keyword;
use App\Models\Officer;
use Illuminate\Support\Arr;
use App\Models\Organization;
use Illuminate\Database\Seeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\UsersSeeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\KeywordSeeder;
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
        $this->call(KeywordSeeder::class);

        $users = User::factory()->count(1996)->create();

        // dd($users->random());

        $organizations = Organization::factory()
            ->count(120);
            
        DB::table('roles')->insert([
            'role_description' => 'student',
        ]);

        $adminRoleID = DB::table('roles')->where('role_description', 'superadmin')->value('roleID');

        DB::table('users')->insert([
            'userID' => '2024000001',
            'email' => 'arvin.alkuino.cics@ust.edu.ph',
            'firstname' => 'arvin',
            'lastname' => 'alkuino',
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ]);

        DB::table('user_roles')->insert([
            'userID' => '2024000001',
            'roleID' => $adminRoleID,
        ]);

        DB::table('users')->insert([
            'userID' => '2024000002',
            'email' => 'laurencearvin.arcilla.cics@ust.edu.ph',
            'firstname' => 'laurence arvin',
            'lastname' => 'arcilla',
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ]);

        DB::table('user_roles')->insert([
            'userID' => '2024000002',
            'roleID' => $adminRoleID,
        ]);

        DB::table('users')->insert([
            'userID' => '2024000003',
            'email' => 'ethanjohn.catacutan.cics@ust.edu.ph',
            'firstname' => 'ethan john',
            'lastname' => 'catacutan',
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ]);

        DB::table('user_roles')->insert([
            'userID' => '2024000003',
            'roleID' => $adminRoleID,
        ]);

        DB::table('users')->insert([
            'userID' => '2024000004',
            'email' => 'josephvictor.paduga.cics@ust.edu.ph',
            'firstname' => 'joseph victor',
            'lastname' => 'paduga',
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ]);

        DB::table('user_roles')->insert([
            'userID' => '2024000004',
            'roleID' => $adminRoleID,
        ]);

        User::factory(10)->create();


        Organization::factory()
            // ->hasPhotos(4)
            ->count(10)
            ->create()
            ->each(function ($organization) use ($users) {
                // Photos
                Photo::factory()
                    ->for($organization, 'organization')
                    ->portrait()
                    ->count(1)
                    ->create();

                Photo::factory()
                    ->for($organization, 'organization')
                    ->count(3)
                    ->create();

                // Random Keywords
                $keywords = Keyword::all()->pluck('keyID')->toArray();
                $randomKeywords = array_rand(array_flip($keywords), rand(5, 15));
                $organization->keywords()->attach($randomKeywords);

                // Random Officers
                $usersArray = $users->pluck('userID')->toArray(); // Get an array of user IDs
                // dd($usersArray);
                Officer::factory()
                    ->count(7)
                    ->for($organization, 'organization')
                    ->create()
                    ->each(function ($officer) use ($usersArray) {
                        $officer->userID = array_rand(array_flip($usersArray)); // Assign a random user ID
                        // dd($officer);
                        // dd($officer);
                        $officer->save(); // Save the officer with the new user ID
                    });

                Contact::factory()
                    ->for($organization, 'organization')
                    ->count(rand(3, 6))
                    ->create();
            });

        /**
         * create 1996 users (4 from seeders totaling to 2000)
         * 4-1500 are students randomly assigned to orgs
         * 1501 - 2000 are admins randomly assigned to orgs
         */

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

        // add us as admin to all orgs
        $this->call(Organization_User_RolesSeeder::class);

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
