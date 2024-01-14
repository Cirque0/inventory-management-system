<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class MotorVehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'make',
        'engine_num',
        'chassis_num',
        'plate_num',
    ];

    public function item(): MorphOne
    {
        return $this->morphOne(Item::class, 'itemable');
    }
}
