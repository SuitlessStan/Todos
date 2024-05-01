<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todo extends Model
{
    use HasFactory;

    protected $table = "todos";


    public function get()
    {
        return self::all();
    }

    public function add($data)
    {
        return self::create($data);
    }

    public function remove($id)
    {
        return self::where("id", $id)->delete();
    }

    public function edit($id, $data)
    {
        return self::where("id", $id)->update($data);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
