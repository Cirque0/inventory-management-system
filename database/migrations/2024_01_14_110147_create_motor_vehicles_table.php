<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('motor_vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('make');
            $table->string('engine_num');
            $table->string('chassis_num');
            $table->string('plate_num');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motor_vehicles');
    }
};
