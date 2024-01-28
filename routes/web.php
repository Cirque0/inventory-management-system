<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
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
    return Redirect::route('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');

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
    Route::get('/items_print', [PrintController::class, 'print'])->name('items.print');

    Route::get('/requests', [RequestController::class, 'show'])->name('requests.show');
    Route::get('/borrow_requests', [RequestController::class, 'show_borrow'])->name('requests.show_borrow');
    Route::post('/requests', [RequestController::class, 'store'])->name('requests.store');
    Route::patch('/requests/approve', [RequestController::class, 'approve'])->name('requests.approve');
    Route::patch('/requests/deny', [RequestController::class, 'deny'])->name('requests.deny');
    Route::patch('/requests/return', [RequestController::class, 'return_item'])->name('requests.return');
    Route::patch('/requests/received', [RequestController::class, 'received_item'])->name('requests.received');
    Route::patch('/requests/delete', [RequestController::class, 'delete'])->name('requests.delete');
    Route::delete('/requests/cancel', [RequestController::class, 'cancel'])->name('requests.cancel');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
