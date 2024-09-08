<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class User_RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_roles')->insert([
            [
                'userID' => '2024000001',
                'roleID' => 2,
            ],
            [
                'userID' => '2024000002',
                'roleID' => 2,
            ],
            [
                'userID' => '2024000003',
                'roleID' => 2,
            ],
            [
                'userID' => '2024000004',
                'roleID' => 2,
            ],
        ]);
    }
}
