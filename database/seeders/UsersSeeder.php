<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'userID' => '2024000001',
                'email' => 'arvin.alkuino.cics@ust.edu.ph',
                'firstname' => 'arvin',
                'lastname' => 'alkuino',
                'middlename' => 'CICS',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000002',
                'email' => 'laurencearvin.arcilla.cics@ust.edu.ph',
                'firstname' => 'laurence arvin',
                'lastname' => 'arcilla',
                'middlename' => 'CICS',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000003',
                'email' => 'ethanjohn.catacutan.cics@ust.edu.ph',
                'firstname' => 'ethan john',
                'lastname' => 'catacutan',
                'middlename' => 'CICS',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000004',
                'email' => 'josephvictor.paduga.cics@ust.edu.ph',
                'firstname' => 'joseph victor',
                'lastname' => 'paduga',
                'middlename' => 'CICS',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ]
        ]);
    }
}
