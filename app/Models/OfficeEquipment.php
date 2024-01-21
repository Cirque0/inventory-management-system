<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class OfficeEquipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'serial_num',
    ];

    public function item(): MorphOne
    {
        return $this->morphOne(Item::class, 'itemable');
    }
}
