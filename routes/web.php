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

Route::get("/todos/{user}", [TodoController::class, "index"])->middleware(["auth", "verified"])->name("todo.index");
Route::post("/todos/{user}", [TodoController::class, "store"])->middleware(["auth", "verified"])->name("todo.store");
Route::put("/todos/{user}/{todo}", [TodoController::class, "update"])->middleware(["auth", "verified"])->name("todo.update");
Route::delete("/todos/{user}/{todo}", [TodoController::class, "destroy"])->middleware(["auth", "verified"])->name("todo.destroy");

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
