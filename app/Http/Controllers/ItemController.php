<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemFormRequest;
use App\Models\Animal;
use App\Models\CommsEquipment;
use App\Models\DRREquipment;
use App\Models\Facility;
use App\Models\FurnitureFixture;
use App\Models\ICT;
use App\Models\Item;
use App\Models\MedicalEquipment;
use App\Models\MotorVehicle;
use App\Models\MPSEquipment;
use App\Models\OfficeEquipment;
use App\Models\OfficeSupplies;
use App\Models\OtherEquipment;
use App\Models\OtherPropertyEquipment;
use App\Models\Quarter;
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
            'items' => Item::with('itemable')->orderBy('id', 'desc')->get(),
        ]);
    }

    public function create() {
        return Inertia::render('Items/Create', [
            'categories' => array_keys(Relation::morphMap()),
        ]);
    }

    public function edit(string $id) {
        return Inertia::render('Items/Edit', [
            'item' => Item::with('itemable')->find($id),
        ]);
    }

    public function update(ItemFormRequest $request, string $id) {
        $item = Item::find($id);
        $itemable = $item->itemable;

        $item->fill($request->only([
            'name',
            'acquisition_date',
            'acquisition_cost',
            'source',
            'status',
            'location',
        ]));

        $item->quantity = $request->quantity ?: 1;
        $item->value = $request->value ?: $request->acquisition_cost;
        $item->save();

        $itemable->fill($request->except([
            'name',
            'category',
            'acquisition_date',
            'acquisition_cost',
            'source',
            'status',
            'quantity',
            'value',
            'location',
        ]));
        $itemable->save();

        return back();
    }

    public function store(ItemFormRequest $request) {
        switch($request->category) {
            case 'Motor Vehicle':
                $itemable = MotorVehicle::create($request->only(['type', 'make', 'engine_num', 'chassis_num', 'plate_num']));
                break;

            case 'Water Craft':
                $itemable = WaterCraft::create($request->only(['type', 'make', 'body_num', 'starboard_side', 'port_side', 'centerboard']));
                break;

            case 'MPS Equipment':
                $itemable = MPSEquipment::create($request->only(['type', 'make', 'cal', 'serial_num']));
                break;

            case 'Communications Equipment':
                $itemable = CommsEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Technical Scientific Equipment':
                $itemable = TechSciEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'ICT':
                $itemable = ICT::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Office Equipment':
                $itemable = OfficeEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Furniture Fixture':
                $itemable = FurnitureFixture::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Medical Equipment':
                $itemable = MedicalEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Other Machinery and Equipment':
                $itemable = OtherEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Disaster Response and Rescue Equipment':
                $itemable = DRREquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Animal':
                $itemable = Animal::create($request->only(['type', 'breed', 'sex', 'color', 'microchip']));
                break;

            case 'Other Property Equipment':
                $itemable = OtherPropertyEquipment::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Office Supplies':
                $itemable = OfficeSupplies::create($request->only(['type', 'make', 'serial_num']));
                break;

            case 'Quarters':
                $itemable = Quarter::create($request->only(['type', 'make']));
                break;

            case 'Buildings and Facilities':
                $itemable = Facility::create($request->only(['type', 'building_code', 'description', 'occupying_office_unit', 'total_floor_area', 'repair_date', 'repair_cost', 'building_ownership']));
                break;
        }

        $item = new Item;

        $item->fill($request->only([
            'name',
            'acquisition_date',
            'acquisition_cost',
            'source',
            'status',
            'location',
        ]));

        $item->quantity = $request->quantity ?: 1;
        $item->value = $request->value ?: $request->acquisition_cost;
        $item->itemable_type = $request->category;
        $item->itemable_id = $itemable->id;
        $item->encoder_id = Auth::id();

        $item->save();

        return Redirect::route('items.show');
    }

    public function destroy(string $id) {
        $item = Item::find($id);

        $itemable = $item->itemable;

        $item->delete();
        $itemable->delete();

        return Redirect::route('items.show');
    }
}
