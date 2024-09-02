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
            // 'University wide',
            // 'College of Information and Computing Sciences',
            // 'Faculty of Engineering',
            // 'Faculty of Arts and Letters',
            // 'College of Science',
            // 'College of Commerce and Business Administration',

            // 'University wide',
            'College of Information and Computing Sciences',
            'Faculty of Engineering',
            'Faculty of Arts and Letters',
            'College of Science',
            'College of Commerce and Business Administration',
            'Alfredo M. Velayo College of Accountancy',
            'College of Architecture',
            'Faculty of Civil Law',
            'College of Education',
            'College of Fine Arts and Design',
            'Faculty of Medicine and Surgery',
            'Conservatory of Music',
            'College of Nursing',
            'Faculty of Pharmacy',
            'Institute of Physical Education and Athletics',
            'College of Rehabilitation Sciences',
            'College of Tourism and Hospitality Management',
            // 'Graduate School',
            // 'Graduate School of Law',
            'Faculty of Canon Law',
            'Faculty of Philosophy',
            'Faculty of Sacred Theology',
            // 'Senior High School',
            // 'Junior High School',
            // 'Education High School',
        ];

        return [
            'name' => 'UST ' . fake()->unique()->company(),
            'logo' => fake()->imageUrl(800, 800, 'logo'),
            'cover' => fake()->imageUrl(2800, 800, 'cover photo'),
            'description' => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
            'fb_link' => fake()->url(),
            'visibility' => fake()->boolean(),
            'department' => fake()->randomElement($departments)
        ];
    }
}