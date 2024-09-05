<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        DB::table('roles')->insert([
            'role_description' => 'superadmin',
        ]);

        DB::table('roles')->insert([
            'role_description' => 'admin',
        ]);

        DB::table('roles')->insert([
            'role_description' => 'student',
        ]);

        $adminRoleID = DB::table('roles')->where('role_description', 'admin')->value('roleID');

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


        Organization::factory(10)->create();
    }
}
