<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{

    private static $emailCounter = 1;

    public function definition()
    {
        $firstname = strtolower(fake()->firstName());
        $lastname = strtolower(fake()->lastName());
        $email = $firstname . '.' . $lastname . '.' . 'cics@ust.edu.ph';

        return [
            'userID' => '2024' . fake()->unique()->numberBetween(100000, 999999),
            'email' => $this->generateUniqueEmail($firstname, $lastname),
            'firstname' => $firstname,
            'lastname' => $lastname,
            'middlename' => 'CICS',
            'college' => 'College of Information and Computing Sciences',
            'status' => 'student',
        ];
    }

    protected function generateUniqueEmail($firstname, $lastname)
    {
        // Custom email generation logic
        $email = strtolower("{$firstname}.{$lastname}." . self::$emailCounter . '@ust.edu.ph');
        self::$emailCounter++;
        return $email;
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function (User $user) {

    //         $roleIDs = Role::whereIn('role_description', ['superadmin', 'admin', 'student'])->pluck('roleID')->toArray();
    //         if (!empty($roleIDs)) {
    //             $user->roles()->attach($this->faker->randomElement($roleIDs));
    //         }
    //     });
    // }

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
