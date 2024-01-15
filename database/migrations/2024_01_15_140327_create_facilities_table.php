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
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('building_code');
            $table->string('description');
            $table->string('occupying_office_unit');
            $table->string('total_floor_area');
            $table->date('repair_date')->nullable();
            $table->bigInteger('repair_cost')->nullable();
            $table->string('building_ownership');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
