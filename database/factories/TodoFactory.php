<?php

namespace Database\Factories;

use App\Models\todo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\todo>
 */
class TodoFactory extends Factory
{

    protected $model = todo::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "text" => $this->faker->sentence,
            "user_id" => function () {
                return \App\Models\User::factory()->create()->id;
            },
            "isDone" => $this->faker->boolean,
        ];
    }
}
