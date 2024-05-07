<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Todo extends Model
{
    use HasFactory;

    protected $table = "todos";
    protected $fillable = ['id', 'user_id', 'text', 'isDone'];


    public static function getAll(User $user)
    {
        return self::where("user_id", $user->id)->whereNull("inActiveAt")->get();
    }

    /**
     * add a new entry of todos.
     */
    public static function add($data)
    {

        $existingTodo = self::where("text", $data["text"])->where("user_id", $data["user_id"])->first();

        if ($existingTodo) {
            return null;
        }

        return self::create($data);
    }

    public static function remove($id, $user)
    {
        return self::where(["id" => $id, "user_id" => $user->id])->update(["inActiveAt" => Carbon::now()->toDateTimeString()]);
    }

    public static function edit($id, $user, $data)
    {
        return self::where(["id" => $id, "user_id" => $user->id])->update($data);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }



}
