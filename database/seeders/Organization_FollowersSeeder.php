<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class Organization_FollowersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIDs = [2024000001, 2024000002, 2024000003, 2024000004];

        $organizationIDs = Organization::all()->pluck('orgID');
        $records = [];

        foreach ($organizationIDs as $organizationID) {
            foreach ($userIDs as $userID) {
                $records[] = [
                    'userID' => $userID,
                    'orgID' => $organizationID,
                ];
            }
        }

        DB::table('organization_followers')->insert($records);
    }
}
