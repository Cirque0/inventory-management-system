<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemFormRequest;
use App\Models\CommsEquipment;
use App\Models\Item;
use App\Models\MotorVehicle;
use App\Models\MPSEquipment;
use App\Models\TechSciEquipment;
use App\Models\WaterCraft;
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

    public function store(ItemFormRequest $request) {
        switch($request->category) {
            case 'Motor Vehicle':
                $itemable = MotorVehicle::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'engine_num' => $request->engine_num,
                    'chassis_num' => $request->chassis_num,
                    'plate_num' => $request->plate_num,
                ]);
                break;

            case 'Water Craft':
                $itemable = WaterCraft::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'body_num' => $request->body_num,
                    'starboard_side' => $request->starboard_side,
                    'port_side' => $request->port_side,
                    'centerboard' => $request->centerboard,
                ]);

                break;

            case 'MPS Equipment':
                $itemable = MPSEquipment::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'cal' => $request->cal,
                    'serial_num' => $request->serial_num,
                ]);

                break; 

            case 'Communications Equipment':
                $itemable = CommsEquipment::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'serial_num' => $request->serial_num,
                ]);

                break; 

            case 'Technical Scientific Equipment':
                $itemable = TechSciEquipment::create([
                    'type' => $request->type,
                    'make' => $request->make,
                    'serial_num' => $request->serial_num,
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
