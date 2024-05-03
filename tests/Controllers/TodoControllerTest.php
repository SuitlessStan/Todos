<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_AuthenticatedUserCanCreateTodo()
    {
        $user = User::factory()->create();

        $todo = [
            "text" => "do the dishes",
            "user_id" => $user->id,
            "isDone" => false
        ];

        $response = $this->actingAs($user)->post(route('todo.store', [
            "user" => $user->id,
            "text" => $todo["text"],
            "user_id" => $todo["user_id"],
            "isDone" => $todo["isDone"]
        ]));

        $response->assertStatus(201);
        $this->assertDatabaseHas("todos", $todo);
    }

    public function test_authenticated_user_can_update_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        $updatedData = [
            "text" => "updated todo text",
            "isDone" => true
        ];

        $response = $this->actingAs($user)->put(route('todo.update', ['user' => $user->id, 'id' => $todo->id]), $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas("todos", $updatedData);
    }

    public function test_authenticated_user_can_delete_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('todo.destroy', ['user' => $user->id, 'id' => $todo->id]));

        $response->assertStatus(200);
        $this->assertDatabaseMissing("todos", ['id' => $todo->id]);
    }
}


?>