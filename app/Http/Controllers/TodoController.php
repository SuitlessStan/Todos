<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        return response()->json(Todo::getAll($user), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user, Request $request)
    {


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {

        $validator = Validator::make($request->all(), [
            "text" => ["required"],
            "user_id" => ["required"],
            "isDone" => ["required"],
        ]);


        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        $data = [
            "text" => $request->input("text"),
            "user_id" => $user->id,
            "isDone" => $request->input("isDone"),
        ];

        $todo = Todo::add($data);

        if (!$todo) {
            return response()->json([
                "error" => "Todo already exists for this user with the same text.",
            ], 400);
        }

        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id, $data)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, Todo $todo)
    {
        $validator = Validator::make($request->all(), [
            "text" => ["required_without:isDone", "string"],
            "isDone" => ["required_without:text", "boolean"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        $todo = Todo::findOrFail($todo->id);

        if ($user->id != $todo->user_id) {
            return response()->json([
                "error" => "Error finding todo belonging to user",
            ], 400);
        }

        return response()->json(Todo::edit($todo->id, $user, $request->only(['text', 'isDone'])), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user, Todo $todo)
    {
        $todo = Todo::findOrFail($todo->id);

        if ($user->id != $todo->user_id) {
            return response()->json([
                "error" => $todo->errors()->first(),
            ], 404);
        }


        return response()->json(Todo::remove($todo->id, $user), 200);
    }
}
