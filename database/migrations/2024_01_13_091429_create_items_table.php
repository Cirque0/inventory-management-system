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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->morphs('itemable');
            $table->date('acquisition_date');
            $table->bigInteger('acquisition_cost');
            $table->string('source');
            $table->string('status');
            $table->bigInteger('quantity');
            $table->bigInteger('value');
            $table->string('location');
            $table->foreignId('encoder_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
