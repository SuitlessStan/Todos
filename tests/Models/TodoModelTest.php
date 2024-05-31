<?php

namespace Tests\Feature;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Carbon;


class TodoModelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * it can get all todos for user
     */
    public function test_it_can_get_all_todo()
    {
        $user = User::factory()->create();

        Todo::factory()->count(3)->create(["user_id" => $user->id]);

        $todos = Todo::getAll($user);

        $this->assertCount(3, $todos);

        foreach ($todos as $todo) {
            $this->assertEquals($user->id, $todo->user_id);
        }
    }

    public function test_it_can_get_all_deleted_todos()
    {
        $user = User::factory()->create();

        Todo::factory()->count(3)->create(["user_id" => $user->id, "inActiveAt" => Carbon::now()->toDateTimeString()]);

        $todos = Todo::getDeleted($user);

        $this->assertCount(3, $todos);

    }

    /**
     * it can create a new todo entry
     */
    public function test_it_can_create_a_todo()
    {
        $todoData = [
            "text" => "watch the football game",
            "user_id" => 2,
            "isDone" => 0
        ];

        $todo = Todo::add($todoData);

        $this->assertNotNull($todo->id);
        $this->assertNotNull($todo->user_id);
        $this->assertEquals($todoData['text'], $todo->text);
        $this->assertEquals($todoData['isDone'], $todo->isDone);

    }

    /**
     * it can update to do
     */
    public function test_it_can_update_a_todo()
    {

        $user = User::factory()->create();
        Todo::factory()->count(1)->create(['user_id' => $user->id]);

        $todo = Todo::getAll($user);
        $todo = $todo[0];

        Todo::edit($todo->id,$user, [
            "text" => "play the piano"
        ]);


        Todo::edit($todo->id,$user, [
            "isDone" => !$todo->isDone,
        ]);


        $updatedTodo = Todo::findOrFail($todo->id);

        $this->assertEquals($updatedTodo->text, "play the piano");
        $this->assertEquals(!$todo->isDone, $updatedTodo->isDone);
    }


    /**
     * it can remove a todo entry
     */
    public function test_it_can_remove_a_todo()
    {

        $user = User::factory()->create();
        $todo = Todo::factory()->count(1)->create(["user_id" => $user->id]);

        dd($todo);

        $isRemoved = Todo::remove($todo->id, $user);

        $this->assertEquals($isRemoved, true);
    }

}


?>