<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/todos/{user}", [TodoController::class, "index"])
        ->where('user', '[0-9]+')
        ->name("todo.index");

    Route::get("/todos/{user}/deleted/{perPage?}", [TodoController::class, "getDeleted"])
        ->where(['user' => '[0-9]+', 'perPage' => '[0-9]+'])
        ->name("todo.getDeleted");

    Route::post("/todos/{user}", [TodoController::class, "store"])
        ->where('user', '[0-9]+')
        ->name("todo.store");

    Route::put("/todos/{user}/{todo}", [TodoController::class, "update"])
        ->where('user', '[0-9]+')
        ->name("todo.update");

    Route::delete("/todos/{user}/{todo}", [TodoController::class, "destroy"])
        ->where('user', '[0-9]+')
        ->name("todo.destroy");

    Route::patch("/todos/{user}", [TodoController::class, "delete"])
        ->where('user', '[0-9]+')
        ->name("todo.delete");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
