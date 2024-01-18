<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RequestController extends Controller
{
    //
    public function show() {
        return Inertia::render('Requests/Requests', [
            'requests' => Auth::user()->role_id === 1 ? RequestModel::with('item', 'requester')->orderBy('id', 'desc')->get() : Auth::user()->requests->load('item', 'requester'),
        ]);
    }

    public function store(Request $request) {
        $requestModel = new RequestModel;

        $requestModel->fill($request->only('item_id', 'quantity'));
        $requestModel->requester_id = Auth::id();

        $requestModel->save();

        return back();
    }
}
