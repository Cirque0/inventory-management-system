<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\MotorVehicle;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ItemController extends Controller
{
    //
    public function show() {
        return Inertia::render('Items/Items', [
            'items' => Item::with('itemable')->get(),
        ]);
    }

    public function create() {
        return Inertia::render('Items/Create', [
            'categories' => array_keys(Relation::morphMap()),
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'category' => [Rule::in(array_keys(Relation::morphMap()))],
            'name' => ['string'],
            'acquisition_date' => ['date'],
            'acquisition_cost' => ['integer'],
            'source' => [Rule::in(['Org', 'Don', 'Lnd', 'FAS'])],
            'status' => [Rule::in(['Svc', 'Uns', 'BER'])],
            'quantity' => ['integer'],
            'value' => ['integer'],
            'location' => ['string'],
        ]);

        switch($request->category) {
            case 'motor_vehicle':
                $request->validate([
                    'type' => ['string'],
                    'make' => ['string'],
                    'engine_num' => ['string'],
                    'chassis_num' => ['string'],
                    'plate_num' => ['string'],
                ]);

                $itemable = MotorVehicle::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'engine_num' => $request->engine_num,
                    'chassis_num' => $request->chassis_num,
                    'plate_num' => $request->plate_num,
                ]);

                break;
        }

        $item = new Item;

        $item->fill($request->only([
            'name',
            'acquisition_date',
            'acquisition_cost',
            'source',
            'status',
            'quantity',
            'value',
            'location',
        ]));

        $item->itemable_type = $request->category;
        $item->itemable_id = $itemable->id;
        $item->encoder_id = Auth::id();

        $item->save();

        return Redirect::route('items.show');
    }
}
