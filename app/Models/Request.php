<?php

namespace App\Models;

use App\Models\Scopes\RequestScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Request extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'item_id',
        'requester_id',
        'quantity',
        'status',
        'remarks',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new RequestScope);
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }
}
