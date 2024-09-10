<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KeywordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $keywords = [
            "Academic",
            "Sports",
            "Music",
            "Dance",
            "Art",
            "Debate",
            "Theater",
            "Science",
            "Technology",
            "Volunteer",
            "Leadership",
            "Culture",
            "Environmental",
            "Business",
            "Entrepreneurship",
            "Social",
            "Media",
            "Photography",
            "Literature",
            "Politics",
            "Charity",
            "Engineering",
            "Coding",
            "Finance",
            "Investment",
            "Marketing",
            "Public",
            "Relations",
            "Health",
            "Wellness",
            "Fitness",
            "Hiking",
            "Travel",
            "Community",
            "Journalism",
            "Film",
            "Robotics",
            "Astronomy",
            "Economics",
            "Psychology",
            "Philosophy",
            "Law",
            "Advocacy",
            "Research",
            "Cooking",
            "Gaming",
            "Cosplay",
            "Anime",
            "Fashion",
            "Design",
            "Mathematics",
            "Chemistry",
            "Biology",
            "Physics",
            "History",
            "Geography",
            "Sociology",
            "Anthropology",
            "Architecture",
            "Interior",
            "Exterior",
            "Urban",
            "Planning",
            "Management",
            "Accounting",
            "Finance",
            "Startup",
            "Networking",
            "Programming",
            "Artificial",
            "Intelligence",
            "Blockchain",
            "Cryptocurrency",
            "Cybersecurity",
            "Ethics",
            "Sustainability",
            "Biotechnology",
            "Nanotechnology",
            "Innovation",
            "Creativity",
            "Writing",
            "Poetry",
            "Drawing",
            "Painting",
            "Sculpture",
            "Crafts",
            "Culinary",
            "Baking",
            "Nutrition",
            "Mindfulness",
            "Meditation",
            "Yoga",
            "Martial",
            "Arts",
            "Self-Defense",
            "Outdoor",
            "Adventure",
            "Exploration",
            "Mountaineering",
            "Orienteering",
            "Strategy",
            "Board",
            "Games",
        ];

        foreach ($keywords as $keyword) {
            // Keyword::create(['name' => $keyword]);
            DB::table('keywords')->insert([
                'keyword' => $keyword,
            ]);
        };
    }
}
