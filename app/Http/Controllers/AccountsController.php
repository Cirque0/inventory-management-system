<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AccountsController extends Controller
{
    //
    public function show() {
        return Inertia::render('Accounts/Accounts', [
            'accounts' => User::where('role_id', 2)->get(),
        ]);
    }

    public function create() {
        return Inertia::render('Accounts/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'role_id' => 2,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        event(new Registered($user));

        return Redirect::route('accounts.show');
    }

    public function edit(Request $request, string $id) {
        return Inertia::render('Accounts/Edit', [
            'account' => User::find($id),
        ]);
    }
    
    public function update(ProfileUpdateRequest $request, string $id) {
        $user = User::find($id);

        $user->fill($request->validated());

        $user->save();

        return Redirect::route('accounts.edit', ['id' => $id]);
    }

    public function password(Request $request, string $id) {
        $validated = $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = User::find($id);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }

    public function destroy(Request $request, string $id) {
        $user = User::find($id);

        $user->delete();

        return Redirect::route('accounts.show');
    }
}
