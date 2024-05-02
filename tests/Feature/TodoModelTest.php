<?php

namespace Tests\Feature;

use App\Models\todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class TodoModelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * it can create a new todo entry
     */
    public function test_it_can_create_a_todo()
    {

        // test data
        $todoData = [
            "text" => "watch the football game",
            "user_id" => 2,
            "isDone" => 0
        ];

        // call to model
        $todo = todo::add($todoData);

        // assertions
        $this->assertNotNull($todo->id);
        $this->assertNotNull($todo->user_id);
        $this->assertEquals($todoData['text'], $todo->text);
        $this->assertEquals($todoData['isDone'], $todo->isDone);

    }
}


?>