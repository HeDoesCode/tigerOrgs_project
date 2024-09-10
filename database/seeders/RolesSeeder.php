<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'roleID' => 3,
                'role_description' => 'superadmin',
            ],
            [
                'roleID' => 2,
                'role_description' => 'admin'
            ],
            [
                'roleID' => 1,
                'role_description' => 'student'
            ],
        ]);

        // DB::table('roles')->insert([
        //     'role_description' => 'admin',
        // ]);

        // DB::table('roles')->insert([
        //     'role_description' => 'student',
        // ]);
    }
}
