<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Facility extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'building_code',
        'description',
        'occupying_office_unit',
        'total_floor_area',
        'repair_date',
        'repair_cost',
        'building_ownership',
    ];

    protected $casts = [
        'repair_date' => 'date',
    ];

    public function item(): MorphOne
    {
        return $this->morphOne(Item::class, 'itemable');
    }
}
