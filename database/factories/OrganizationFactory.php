<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

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

    private static $i = 0;

    public function definition(): array
    {
        self::$i++;
        $departments = [
            'University Wide',
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
            'Faculty of Canon Law',
            'Faculty of Philosophy',
            'Faculty of Sacred Theology',
        ];

        return [
            'recruiting' => (bool) rand(0, 1),
            'name' => 'UST ' . fake()->unique()->company(),
            'logo' => "default.jpeg",
            'coverPhoto' => "default.jpeg",
            'description' => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
            // 'fb_link' => fake()->url(),
            'fb_link' => '',
            'visibility' => fake()->boolean(),
            'department' => fake()->randomElement($departments)
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($organization) {
            DB::table('organization_photos')->insert([
                'orgID' => $organization->orgID,
                'caption' => 'sample',
                'filename' => 'default.jpeg',
            ]);
        });
    }
}
