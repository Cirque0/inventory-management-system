<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class RequestController extends Controller
{
    //
    public function store(Request $request) {
        $requestModel = new RequestModel;

        $requestModel->fill($request->only('item_id', 'quantity'));
        $requestModel->requester_id = Auth::id();

        $requestModel->save();

        return back();
    }
}
