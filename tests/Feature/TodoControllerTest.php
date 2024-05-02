<?php



namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAuthenticatedUserCanCreateTodo()
    {
        $user = User::factory()->create();

        $todo = [
            "text" => "do the dishes",
            "user_id" => $user->id,
            "isDone" => false
        ];

        $response = $this->actingAs($user)->post(route('todo.create', [
            "user" => $user->id,
            "text" => $todo["text"],
            "user_id" => $todo["user_id"],
            "isDone" => $todo["isDone"]
        ]));

        $response->assertStatus(201);
        $this->assertDatabaseHas("todos", $todo);
    }
}


?>