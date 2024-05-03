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
    public function index(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            "id" => ["required", "string", "integer"],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        return response()->json(Todo::get($user), 200);
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
            "text" => ["required", "string"],
            "user_id" => ["required", "integer", "string"],
            "isDone" => ["required", "integer", "boolean", "string"],
        ]);


        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        return response()->json(Todo::add($validator->getData()), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(todo $todo)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $user, $id)
    {
        $todo = Todo::findOrFail($id);
        if ($user->id != $todo->user_id) {
            return response()->json([
                "error" => $todo->errors()->first(),
            ]);
        }
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

        $requestData = [];
        $keys = ["text", "isDone"];
        foreach ($keys as $key) {
            if ($request->has($key)) {
                $requestData[$key] = $request->input($key);
            }
        }

        return response()->json(Todo::edit($id, $requestData), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $user, $id)
    {
        $todo = Todo::findOrFail($id);
        if ($user->id != $todo->user_id) {
            return response()->json([
                "error" => $todo->errors()->first(),
            ]);
        }
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

        $requestData = [];
        $keys = ["text", "isDone"];
        foreach ($keys as $key) {
            if ($request->has($key)) {
                $requestData[$key] = $request->input($key);
            }
        }

        return response()->json(Todo::edit($id, $requestData), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Request $request, $id)
    {
        $todo = Todo::findOrFail($id);

        if ($user->id != $todo->user_id) {
            return response()->json([
                "error" => $todo->errors()->first(),
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "id" => ["required", "string", "integer"],
            "user_id" => ["required", "string", "integer"]
        ]);

        if ($validator->fails()) {
            return response()->json([
                "error" => $validator->errors()->first(),
            ], 400);
        }

        return response()->json(Todo::destroy($id), 200);
    }
}
