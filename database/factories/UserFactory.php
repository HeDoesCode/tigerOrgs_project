<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition()
    {
        $firstname = strtolower(fake()->firstName());
        $lastname = strtolower(fake()->lastName());
        $email = $firstname.'.'.$lastname.'.'.'cics@ust.edu.ph';

        return [
            'userID' => '2024'.random_int(100000,999999),
            'email' => $email,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ];
    }

    // /**
    //  * The current password being used by the factory.
    //  */
    // protected static ?string $password;

    // /**
    //  * Define the model's default state.
    //  *
    //  * @return array<string, mixed>
    //  */
    // public function definition(): array
    // {
    //     return [
    //         'name' => fake()->name(),
    //         'email' => fake()->unique()->safeEmail(),
    //         'email_verified_at' => now(),
    //         'password' => static::$password ??= Hash::make('password'),
    //         'remember_token' => Str::random(10),
    //     ];
    // }

    // /**
    //  * Indicate that the model's email address should be unverified.
    //  */
    // public function unverified(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'email_verified_at' => null,
    //     ]);
    // }
}
