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
        Schema::create('water_crafts', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('make');
            $table->string('body_num');
            $table->string('starboard_side');
            $table->string('port_side');
            $table->string('centerboard');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_crafts');
    }
};
