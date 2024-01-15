<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'itemable_id',
        'itemable_type',
        'acquisition_date',
        'acquisition_cost',
        'source',
        'status',
        'quantity',
        'value',
        'location',
        'encoder_id',
    ];

    protected $attributes = [
        'quantity' => 0,
        'value' => 0,
    ];

    protected $casts = [
        'acquisition_date' => 'date',
    ];

    public function itemable(): MorphTo
    {
        return $this->morphTo();
    }

    public function encoder(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
