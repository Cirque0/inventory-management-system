<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('items')->insert([
            'name' => 'Honda CB650R',
            'itemable_id' => 1,
            'itemable_type' => 'motor_vehicle',
            'acquisition_date' => date('Y-m-d'),
            'acquisition_cost' => 550000,
            'source' => 'Org',
            'status' => 'Svc',
            'quantity' => 1,
            'value' => 450000,
            'location' => 'Garage',
            'encoder_id' => 1
        ]);
    }
}
