<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class Organization_User_RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIDs = [2024000001, 2024000002, 2024000003, 2024000004];

        // Retrieve all organizations
        $organizations = Organization::inRandomOrder()->limit(10)->get();

        // Prepare records to insert
        $records = [];
        foreach ($organizations as $organization) {
            foreach ($userIDs as $userID) {
                $records[] = [
                    'orgID' => $organization->orgID,
                    'userID' => $userID,
                    'roleID' => rand(1, 2),
                ];
            }
        }

        // Insert records into the `organization_user_role` table
        DB::table('organization_user_role')->insert($records);
    }
}
