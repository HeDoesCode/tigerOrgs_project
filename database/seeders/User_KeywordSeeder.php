<?php

namespace Database\Seeders;

use App\Models\Keyword;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User_KeywordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $keywordsArray = array_flip(Keyword::all()->pluck('keyID')->toArray());

        User::all()->each(function ($user) use ($keywordsArray) {
            $randomKeywords = array_rand($keywordsArray, rand(2, 5));
            $user->keywords()->attach($randomKeywords);
        });
    }
}
