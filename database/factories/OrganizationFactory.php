<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = [
            'University wide',
            'College of Information and Computing Sciences',
            'Faculty of Engineering',
            'Faculty of Arts and Letters',
            'College of Science',
            'College of Commerce and Business Administration',
            // add more pls helppp
        ];

        return [
            'name' => 'UST ' . fake()->unique()->company(),
            'logo' => fake()->imageUrl(800, 800, 'logo'),
            'cover' => fake()->imageUrl(2800, 800, 'cover photo'),
            'description' => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
            'fb_link' => fake()->url(),
            'visibility' =>fake()->boolean(),
            'department' => fake()->randomElement($departments)
        ];
    }
}
