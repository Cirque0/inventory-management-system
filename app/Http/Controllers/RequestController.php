<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Request as RequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RequestController extends Controller
{
    //
    public function show() {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        
        return Inertia::render('Requests/Requests', [
            'requests' => Auth::user()->role_id === 1 ? RequestModel::with('item', 'requester')->orderBy('id', 'desc')->get() : $user->requests()->with('item', 'requester')->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request) {
        $requestModel = new RequestModel;

        $requestModel->fill($request->only('item_id', 'quantity'));
        $requestModel->requester_id = Auth::id();

        $requestModel->save();

        return Redirect::route('requests.show');
    }

    public function approve(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $item = Item::find($requestModel->item_id);
        
        if($item->quantity >= $requestModel->quantity) {
            $requestModel->status = 'approved';
            $requestModel->save();
    
            $item->quantity = $item->quantity - $requestModel->quantity;
            $item->save();
            
            return back();
        }
        else {
            return back()->withErrors(['request_id' => 'This item is out of stock.']);
        }
    }

    public function deny(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->status = 'denied';
        $requestModel->save();

        return back();
    }
}
