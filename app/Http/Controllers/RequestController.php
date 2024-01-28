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
            'requests' => Auth::user()->role_id === 1 ? (
                RequestModel::with('item', 'requester')
                ->orderBy('id', 'desc')
                ->whereHas('item', function ($query) {
                    $query->where('itemable_type', 'Office Supplies');
                })
                ->get()
            ) : (
                $user->requests()
                ->with('item', 'requester')
                ->orderBy('id', 'desc')
                ->whereHas('item', function ($query) {
                    $query->where('itemable_type', 'Office Supplies');
                })
                ->get()
            ),
        ]);
    }

    public function show_borrow() {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        
        return Inertia::render('Requests/BorrowRequests', [
            'requests' => Auth::user()->role_id === 1 ? (
                RequestModel::with('item', 'requester')
                ->orderBy('id', 'desc')
                ->whereHas('item', function ($query) {
                    $query->whereIn('itemable_type', [
                        "Communications Equipment",
                        "Technical Scientific Equipment",
                        "ICT",
                        "Other Machinery and Equipment",
                        "Disaster Response and Rescue Equipment",
                        "Other Property Equipment",
                        "Quarters",
                    ]);
                })
                ->get()
            ) : (
                $user->requests()
                ->with('item', 'requester')
                ->orderBy('id', 'desc')
                ->whereHas('item', function ($query) {
                    $query->whereIn('itemable_type', [
                        "Communications Equipment",
                        "Technical Scientific Equipment",
                        "ICT",
                        "Other Machinery and Equipment",
                        "Disaster Response and Rescue Equipment",
                        "Other Property Equipment",
                        "Quarters",
                    ]);
                })
                ->get()
            ),
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'item_id' => ['required', 'exists:items,id'],
            'quantity' => ['required', 'gt:0'],
        ]);
        
        $requestModel = new RequestModel;

        $requestModel->fill($request->only('item_id', 'quantity'));
        $requestModel->requester_id = Auth::id();

        $requestModel->save();

        if(in_array($requestModel->item->itemable_type, [
            "Communications Equipment",
            "Technical Scientific Equipment",
            "ICT",
            "Other Machinery and Equipment",
            "Disaster Response and Rescue Equipment",
            "Other Property Equipment",
            "Quarters",
        ])) {
            return Redirect::route('requests.show_borrow');
        }
        
        return Redirect::route('requests.show');
    }

    public function approve(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
            'remarks' => ['nullable', 'string'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $item = Item::find($requestModel->item_id);
        
        if($item->quantity >= $requestModel->quantity) {
            $requestModel->status = 'approved';
            $requestModel->remarks = $request->remarks;
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
            'remarks' => ['nullable', 'string'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->status = 'denied';
        $requestModel->remarks = $request->remarks;
        $requestModel->save();

        return back();
    }

    public function cancel(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->forceDelete();

        return back();
    }

    public function delete(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->delete();

        return back();
    }

    public function return_item(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
            'remarks' => ['nullable', 'string'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->status = 'pending_return';
        $requestModel->save();

        return back();
    }

    public function received_item(Request $request) {
        $request->validate([
            'request_id' => ['required', 'exists:requests,id'],
        ]);

        $requestModel = RequestModel::find($request->request_id);
        $requestModel->status = 'returned';
        $requestModel->remarks = $request->remarks;

        $item = $requestModel->item;
        $item->quantity = $item->quantity + $requestModel->quantity;

        $item->save();
        $requestModel->save();

        return back();
    }
}
