<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
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

    // protected $casts = [
    //     'acquisition_date' => 'date',
    // ];

    public function itemable(): MorphTo
    {
        return $this->morphTo();
    }

    public function encoder(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requests(): HasMany
    {
        return $this->hasMany(Request::class);
    }
}
