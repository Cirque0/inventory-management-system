<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class WaterCraft extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'make',
        'body_num',
        'starboard_side',
        'port_side',
        'centerboard',
    ];

    public function item(): MorphOne
    {
        return $this->morphOne(Item::class, 'itemable');
    }
}
