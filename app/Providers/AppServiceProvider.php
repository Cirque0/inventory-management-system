<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Relation::enforceMorphMap([
            'Motor Vehicle' => 'App\Models\MotorVehicle',
            'Water Craft' => 'App\Models\WaterCraft',
            'MPS Equipment' => 'App\Models\MPSEquipment',
            'MPS Equipment Non-Combat' => 'App\Models\MPSNonCombat',
            'Communications Equipment' => 'App\Models\CommsEquipment',
            'Technical Scientific Equipment' => 'App\Models\TechSciEquipment',
            'ICT' => 'App\Models\ICT',
            'Office Equipment' => 'App\Models\OfficeEquipment',
            'Furniture Fixture' => 'App\Models\FurnitureFixture',
            'Medical Equipment' => 'App\Models\MedicalEquipment',
            'Other Machinery and Equipment' => 'App\Models\OtherEquipment',
            'Disaster Response and Rescue Equipment' => 'App\Models\DRREquipment',
            'Work/Zoo Animals' => 'App\Models\Animal',
            'Other Property Equipment' => 'App\Models\OtherPropertyEquipment',
            'Office Supplies' => 'App\Models\OfficeSupplies',
            'Quarters' => 'App\Models\Quarter',
            'Buildings and Facilities' => 'App\Models\Facility',
        ]);
    }
}
