<?php

namespace Database\Factories;

use Exception;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Photo>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected static $imgCount = 0;

    public function definition(): array
    {
        $dimensions = $this->faker->randomElement([
            '640/480',  // Landscape
            '800/600',  // Another landscape size
            '1024/768', // Another landscape size
            '1280/720', // Landscape HD
            '1920/1080' // Full HD landscape
        ]);
        self::$imgCount++;
        return [
            'orgID' => Organization::factory(),
            'caption' => fake()->sentence(),
            'filename' => "https://picsum.photos/id/" . self::$imgCount . "/$dimensions",
        ];
    }

    public function portrait()
    {
        return $this->state(function (array $attributes) {
            return [
                'filename' => ("https://picsum.photos/id/" . self::$imgCount . "/500/800"),
            ];
        });
    }
}
