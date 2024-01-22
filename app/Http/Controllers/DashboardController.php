<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Request as RequestModel;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function show() {
        return Inertia::render('Dashboard', [
            "requests" => Auth::user()->role_id === 1 ? (
                RequestModel::orderBy('id', 'desc')
                    ->with(['item', 'requester'])
                    ->where('status', 'pending')
                    ->get()
            ) : (
                Auth::user()->requests()->with(['item', 'requester'])->orderBy('id', 'desc')->take(6)->get()
            ),
            "total_items" => Item::all()->count(),
            "total_categories" => count(array_keys(Relation::morphMap())),
            "total_out_of_stock" => Item::where('itemable_type', 'Office Supplies')->where('quantity', 0)->count(),
        ]);
    }
}
