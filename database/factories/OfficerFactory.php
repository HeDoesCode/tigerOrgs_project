<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Officer>
 */
class OfficerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $organizationPositions = [
            'President',
            'Vice President',
            'Secretary',
            'Treasurer',
            'Auditor',
            'Public Relations Officer',
            'Membership Officer',
            'Project Manager',
            'Marketing Officer',
            'Creative Director',
            'Social Media Manager',
            'Human Resources Officer',
            'Logistics Officer',
            'Fundraising Coordinator',
            'Technical Head',
            'Research and Development Officer',
            'Adviser',
            'Committee Chairperson',
            'Volunteer Coordinator',
            'Training Officer'
        ];


        return [
            'orgID' => Organization::factory(),
            'userID' => User::factory(),
            'position' => array_rand(array_flip($organizationPositions)),
        ];
    }

    public function position(string $position)
    {
        return $this->state(function () use ($position) {
            return [
                'position' => $position,
            ];
        });
    }
}
