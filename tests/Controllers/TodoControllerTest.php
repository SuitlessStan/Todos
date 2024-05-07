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

    public function test_authenticated_user_can_create_todo()
    {
        $user = User::factory()->create();

        $todoData = [
            "text" => "do the dishes",
            "user_id" => $user->id,
            "isDone" => false
        ];

        $response = $this->actingAs($user)->post(route('todo.store', ["user" => $user]), $todoData);

        $response->assertStatus(201);
        $this->assertDatabaseHas("todos", $todoData);
    }

    public function test_authenticated_user_can_update_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        $updatedData = [
            "text" => "updated todo text",
            "isDone" => true
        ];

        $response = $this->actingAs($user)->put(route('todo.update', ["user" => $user, "todo" => $todo]), $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas("todos", $updatedData);
    }

    public function test_authenticated_user_can_delete_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('todo.destroy', ["user" => $user, "todo" => $todo]));

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_get_all_todos()
    {
        $user = User::factory()->create();
        Todo::factory(10)->create(["user_id" => $user->id, "inActiveAt" => null]);

        $response = $this->actingAs($user)->get(route("todo.index", ["user" => $user]));

        $response->assertStatus(200);
    }
}


?>