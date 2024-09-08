<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Organization_User_RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create organizations and users
        $organizations = \App\Models\Organization::factory()->count(10)->create();
        $users = \App\Models\User::factory()->count(20)->create();

        // Define fixed role IDs
        $roles = [
            1 => 'student',
            2 => 'admin',
            3 => 'superadmin',
        ];

        // Prepare data for insertion
        $insertData = [];
        foreach ($organizations as $organization) {
            foreach ($users as $user) {
                foreach ($roles as $roleID => $roleName) {
                    $insertData[] = [
                        'orgID' => $organization->orgID,
                        'userID' => $user->userID,
                        'roleID' => $roleID,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Insert data into the organization_user_role table
        DB::table('organization_user_role')->insert($insertData);
    }
}
