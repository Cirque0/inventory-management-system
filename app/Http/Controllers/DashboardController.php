<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Request as RequestModel;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function show() {
        return Inertia::render('Dashboard', [
            "pending_requests" => RequestModel::orderBy('id', 'desc')
                ->with(['item', 'requester'])
                ->where('status', 'pending')
                ->get(),
            "total_items" => Item::all()->count(),
            "total_categories" => count(array_keys(Relation::morphMap())),
            "total_out_of_stock" => Item::where('quantity', 0)->count(),
        ]);
    }
}
