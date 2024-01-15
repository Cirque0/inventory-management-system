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
            'Communications Equipment' => 'App\Models\CommsEquipment',
            'Technical Scientific Equipment' => 'App\Models\TechSciEquipment',
            'ICT' => 'App\Models\ICT',
            'Office Equipment' => 'App\Models\OfficeEquipment',
            'Furniture Fixture' => 'App\Models\FurnitureFixture',
        ]);
    }
}
