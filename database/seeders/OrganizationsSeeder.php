<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrganizationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $OrganizationRecords = [];
        $OrganizationRecords[] = [
            'name' => 'Office for Student Affairs',
            'logo' => "default.jpeg",
            'coverPhoto' => "default.jpeg",
            'description' => 'This is our client if you must know',
            'fb_link' => fake()->url(),
            'department' => 'University-Wide',
        ];

        DB::table('organizations')->insert($OrganizationRecords);

        // $OSAPhotos
    }
}
