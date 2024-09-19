<?php

namespace Database\Seeders;

use DateTime;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SuperAdminLoginHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // [
        //     'userID' => '2024000004',
        //     'email' => 'josephvictor.paduga.cics@ust.edu.ph',
        //     'firstname' => 'joseph victor',
        //     'lastname' => 'paduga',
        //     'middlename' => 'CICS',
        //     'college' => 'College of Information and Computing Sciences',
        //     'status' => 'student',
        // ]

        $records = [];
        $startDate = new DateTime('2024-01-01');
        for ($i = 1; $i < 501; $i++) {
            $records[] = [
                'loginID' => $i,
                'userID' => '2024000004',
                'login_timestamp' => $startDate->format('Y-m-d H:i:s'),
            ];

            $startDate->modify('+1 day');
        }

        DB::table('superadmin_login_history')->insert($records);
    }
}
