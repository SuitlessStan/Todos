<?php

namespace App\Http\Controllers;

use App\Models\todo;
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
        return Todo::where("user_id", $user->id)->get()->toJson();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user, Request $request)
    {

        $validator = Validator::make($request->all(), [
            "text" => ["required", "string"],
            "user_id" => ["required", "integer", "string"],
            "isDone" => ["required", "integer", "boolean", "string"],
        ]);


        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        $todo = Todo::add($validator->getData());

        return response()->json($todo, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(todo $todo)
    {
        //
    }
}
