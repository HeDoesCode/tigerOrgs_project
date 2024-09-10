<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $defaultPlatforms = [
            'email',
            'facebook',
            'instagram',
            'x',
            'default',
        ];
        return [
            'orgID' => Organization::factory(),
            'platform' => array_rand(array_flip($defaultPlatforms)),
            'name' => fake()->word(),
            'address' => fake()->url(),
        ];
    }
}
