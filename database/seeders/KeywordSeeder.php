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



        // Original array of keywords
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
            "TikTok",
            "Influencer Marketing",
            "Digital Content Creation",
            "Streaming",
            "Podcasting",
            "YouTube",
            "Social Media Management",
            "Virtual Reality",
            "Augmented Reality",
            "NFTs",
            "Metaverse",
            "Drone Racing",
            "E-Gaming",
            "Mobile App Development",
            "UX/UI Design",
            "Data Science",
            "Machine Learning",
            "SaaS",
            "Green Energy",
            "Eco-Tech",
            "E-Sports",
            "Language",
            "Cultural Exchange",
            "Peer Mentoring",
            "Tutoring",
            "Career Development",
            "Student Government",
            "Residence Life",
            "Public Speaking",
            "Event Planning",
            "Social Impact",
            "Inclusivity",
            "Gender Equality",
            "Mental Health Awareness",
            "Disability Advocacy",
            "Peer Support",
            "Sustainability Projects",
            "Climate Action",
            "Interfaith Dialogue",
            "Interfaith",
            "Spirituality",
            "Faith-Based Service",
            "Religious Studies",
            "Meditation and Prayer",
            "Interfaith Council",
            "Religious Tolerance",
            "Moral Philosophy",
            "Ethics in Religion",
            "International"
        ];

        // Transform the keywords into an array of associative arrays with 'keyID' and 'keyword'
        $keywordData = [];
        foreach ($keywords as $index => $keyword) {
            $keywordData[] = [
                'keyID' => $index + 1,   // Start keyID from 1
                'keyword' => $keyword
            ];
        }

        // Insert into the 'keywords' table
        DB::table('keywords')->insert($keywordData);



        // $keywords = [
        //     "Academic",
        //     "Sports",
        //     "Music",
        //     "Dance",
        //     "Art",
        //     "Debate",
        //     "Theater",
        //     "Science",
        //     "Technology",
        //     "Volunteer",
        //     "Leadership",
        //     "Culture",
        //     "Environmental",
        //     "Business",
        //     "Entrepreneurship",
        //     "Social",
        //     "Media",
        //     "Photography",
        //     "Literature",
        //     "Politics",
        //     "Charity",
        //     "Engineering",
        //     "Coding",
        //     "Finance",
        //     "Investment",
        //     "Marketing",
        //     "Public",
        //     "Relations",
        //     "Health",
        //     "Wellness",
        //     "Fitness",
        //     "Hiking",
        //     "Travel",
        //     "Community",
        //     "Journalism",
        //     "Film",
        //     "Robotics",
        //     "Astronomy",
        //     "Economics",
        //     "Psychology",
        //     "Philosophy",
        //     "Law",
        //     "Advocacy",
        //     "Research",
        //     "Cooking",
        //     "Gaming",
        //     "Cosplay",
        //     "Anime",
        //     "Fashion",
        //     "Design",
        //     "Mathematics",
        //     "Chemistry",
        //     "Biology",
        //     "Physics",
        //     "History",
        //     "Geography",
        //     "Sociology",
        //     "Anthropology",
        //     "Architecture",
        //     "Interior",
        //     "Exterior",
        //     "Urban",
        //     "Planning",
        //     "Management",
        //     "Accounting",
        //     "Finance",
        //     "Startup",
        //     "Networking",
        //     "Programming",
        //     "Artificial",
        //     "Intelligence",
        //     "Blockchain",
        //     "Cryptocurrency",
        //     "Cybersecurity",
        //     "Ethics",
        //     "Sustainability",
        //     "Biotechnology",
        //     "Nanotechnology",
        //     "Innovation",
        //     "Creativity",
        //     "Writing",
        //     "Poetry",
        //     "Drawing",
        //     "Painting",
        //     "Sculpture",
        //     "Crafts",
        //     "Culinary",
        //     "Baking",
        //     "Nutrition",
        //     "Mindfulness",
        //     "Meditation",
        //     "Yoga",
        //     "Martial",
        //     "Arts",
        //     "Self-Defense",
        //     "Outdoor",
        //     "Adventure",
        //     "Exploration",
        //     "Mountaineering",
        //     "Orienteering",
        //     "Strategy",
        //     "Board",
        //     "Games",
        //     "TikTok",
        //     "Influencer Marketing",
        //     "Digital Content Creation",
        //     "Streaming",
        //     "Podcasting",
        //     "YouTube",
        //     "Social Media Management",
        //     "Virtual Reality",
        //     "Augmented Reality",
        //     "NFTs",
        //     "Metaverse",
        //     "Drone Racing",
        //     "E-Gaming",
        //     "Mobile App Development",
        //     "UX/UI Design",
        //     "Data Science",
        //     "Machine Learning",
        //     "SaaS",
        //     "Green Energy",
        //     "Eco-Tech",
        //     "E-Sports",
        //     "Debate",
        //     "Language",
        //     "Cultural Exchange",
        //     "Peer Mentoring",
        //     "Tutoring",
        //     "Career Development",
        //     "Student Government",
        //     "Residence Life",
        //     "Public Speaking",
        //     "Event Planning",
        //     "Social Impact",
        //     "Inclusivity",
        //     "Gender Equality",
        //     "Mental Health Awareness",
        //     "Disability Advocacy",
        //     "Peer Support",
        //     "Sustainability Projects",
        //     "Climate Action",
        //     "Interfaith Dialogue",
        //     "Interfaith",
        //     "Spirituality",
        //     "Faith-Based Service",
        //     "Religious Studies",
        //     "Meditation and Prayer",
        //     "Interfaith Council",
        //     "Religious Tolerance",
        //     "Moral Philosophy",
        //     "Ethics in Religion",
        // ];
        // // other contemporary keywords

        // DB::table('keywords')->insert($keywords);
        // foreach ($keywords as $keyword) {
        //     // Keyword::create(['name' => $keyword]);
        //     DB::table('keywords')->insert([
        //         'keyword' => $keyword,
        //     ]);
        // };
    }
}
