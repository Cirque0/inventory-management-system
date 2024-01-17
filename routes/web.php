<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/accounts', [AccountsController::class, 'show'])->name('accounts.show');
    Route::get('/accounts/create', [AccountsController::class, 'create'])->name('accounts.create');
    Route::post('/accounts/store', [AccountsController::class, 'store'])->name('accounts.store');
    Route::get('/accounts/{id}', [AccountsController::class, 'edit'])->name('accounts.edit');
    Route::patch('/accounts/{id}', [AccountsController::class, 'update'])->name('accounts.update');
    Route::put('/accounts/{id}/password', [AccountsController::class, 'password'])->name('accounts.password');
    Route::delete('/accounts/{id}', [AccountsController::class, 'destroy'])->name('accounts.destroy');

    Route::get('/items', [ItemController::class, 'show'])->name('items.show');
    Route::get('/items/add', [ItemController::class, 'create'])->name('items.create');
    Route::get('/items/{id}', [ItemController::class, 'edit'])->name('items.edit');
    Route::patch('/items/{id}', [ItemController::class, 'update'])->name('items.update');
    Route::delete('/items/{id}', [ItemController::class, 'destroy'])->name('items.destroy');
    Route::post('/items/add', [ItemController::class, 'store'])->name('items.store');

    Route::post('/requests', [RequestController::class, 'store'])->name('requests.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
