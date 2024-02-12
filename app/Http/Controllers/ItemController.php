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
    private function getMorphClassesExcept(array $excludedMorphs) {
        $morphMap = Relation::morphMap();

        foreach ($excludedMorphs as $morph) {
            unset($morphMap[$morph]);
        }

        return $morphMap;
    }

    public function show(Request $request) {
        $category = $request->query('category');
        error_log(json_encode($request->query()));

        $itemQuery = Item::with('itemable')->orderBy('id', 'desc');

        $request->whenFilled('category', function (string $input) use ($itemQuery, $category) {
            if($category !== 'All') {
                $itemQuery->where('itemable_type', $input);
            }
        });

        $request->whenFilled('query', function (string $input) use ($itemQuery) {
            // $itemQuery->where('type', 'like', '%' . $input . '%');

            $itemQuery->where(function ($query) use ($itemQuery, $input) {
                $query->where('type', 'like', '%' . $input . '%')
                    ->orWhere('source', 'like', '%' . $input . '%')
                    ->orWhere('status', 'like', '%' . $input . '%')
                    ->orWhere('location', 'like', '%' . $input . '%')
                    ->orWhere('quantity', $input)
                    ->orWhereHasMorph(
                        'itemable',
                        $this->getMorphClassesExcept(['Buildings and Facilities', 'Work/Zoo Animals']),
                        function ($query) use ($input) {
                            $query->where('make', 'like', '%' . $input . '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        $this->getMorphClassesExcept(['Buildings and Facilities', 'Work/Zoo Animals', 'Motor Vehicle', 'Water Craft', 'Quarters']),
                        function ($query) use ($input) {
                            $query->where('serial_num', 'like', '%' . $input . '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        [MotorVehicle::class],
                        function ($query) use ($input) {
                            $query->where('engine_num', 'like', '%' . $input . '%')
                                ->orWhere('chassis_num', 'like', '%' . $input .  '%')
                                ->orWhere('plate_num', 'like', '%' . $input .  '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        [WaterCraft::class],
                        function ($query) use ($input) {
                            $query->where('body_num', 'like', '%' . $input . '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        [MPSEquipment::class],
                        function ($query) use ($input) {
                            $query->where('cal', 'like', '%' . $input . '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        [Animal::class],
                        function ($query) use ($input) {
                            $query->where('breed', 'like', '%' . $input . '%')
                                ->orWhere('name', 'like', '%' . $input . '%');
                        }
                    )
                    ->orWhereHasMorph(
                        'itemable',
                        [Facility::class],
                        function ($query) use ($input) {
                            $query->where('building_code', 'like', '%' . $input . '%')
                                ->orWhere('total_floor_area', $input);
                        }
                    );
            });
        });
        
        return Inertia::render('Items/Items', [
            'items' => $itemQuery->get(),
            'categories' => array_keys(Relation::morphMap()),
            "total_items" => $category && $category !== 'All' ? Item::where('itemable_type', $category)->count() : Item::count(),
            "total_categories" => count(array_keys(Relation::morphMap())),
            "total_out_of_stock" => Item::where('itemable_type', 'Office Supplies')->where('quantity', 0)->count(),
            "name_exists" => $request->filled('category'),
        ]);
    }

    public function create() {
        return Inertia::render('Items/Create', [
            'categories' => array_keys(Relation::morphMap()),
        ]);
    }

    public function edit(string $id) {
        return Inertia::render('Items/Edit', [
            'item' => Item::with([
                'itemable',
                'requests' => ['requester']
            ])->find($id),
        ]);
    }

    public function update(ItemFormRequest $request, string $id) {
        $item = Item::find($id);
        $itemable = $item->itemable;

        $item->fill($request->only([
            'type',
            'property_num',
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
            'type',
            'property_num',
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
                $itemable = MotorVehicle::create($request->only(['make', 'engine_num', 'chassis_num', 'plate_num']));
                break;

            case 'Water Craft':
                $itemable = WaterCraft::create($request->only(['make', 'body_num', 'starboard_side', 'port_side', 'centerboard']));
                break;

            case 'MPS Equipment':
                $itemable = MPSEquipment::create($request->only(['make', 'cal', 'serial_num']));
                break;

            case 'Communications Equipment':
                $itemable = CommsEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Technical Scientific Equipment':
                $itemable = TechSciEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'ICT':
                $itemable = ICT::create($request->only(['make', 'serial_num']));
                break;

            case 'Office Equipment':
                $itemable = OfficeEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Furniture Fixture':
                $itemable = FurnitureFixture::create($request->only(['make', 'serial_num']));
                break;

            case 'Medical Equipment':
                $itemable = MedicalEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Other Machinery and Equipment':
                $itemable = OtherEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Disaster Response and Rescue Equipment':
                $itemable = DRREquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Work/Zoo Animals':
                $itemable = Animal::create($request->only(['name', 'breed', 'sex', 'color', 'microchip']));
                break;

            case 'Other Property Equipment':
                $itemable = OtherPropertyEquipment::create($request->only(['make', 'serial_num']));
                break;

            case 'Office Supplies':
                $itemable = OfficeSupplies::create($request->only(['make', 'serial_num']));
                break;

            case 'Quarters':
                $itemable = Quarter::create($request->only(['make']));
                break;

            case 'Buildings and Facilities':
                $itemable = Facility::create($request->only(['building_code', 'description', 'occupying_office_unit', 'total_floor_area', 'repair_date', 'repair_cost', 'building_ownership']));
                break;
        }

        $item = new Item;

        $item->fill($request->only([
            'type',
            'property_num',
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
