<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todo extends Model
{
    use HasFactory;

    protected $table = "todos";
    protected $fillable = ['id', 'user_id', 'text', 'isDone'];


    public static function get()
    {
        return self::all();
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

    public static function remove($id)
    {
        return self::where("id", $id)->delete();
    }

    public static function edit($id, $data)
    {
        return self::where("id", $id)->update($data);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
