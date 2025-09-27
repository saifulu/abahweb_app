<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HostingService extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_name',
        'domain',
        'service_type',
        'status',
        'server_ip',
        'port',
        'username',
        'password',
        'expiry_date',
        'auto_renew',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'datetime',
            'auto_renew' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeExpiringSoon($query, $days = 30)
    {
        return $query->where('expiry_date', '<=', now()->addDays($days));
    }

    public function isExpired(): bool
    {
        return $this->expiry_date < now();
    }

    public function isExpiringSoon($days = 30): bool
    {
        return $this->expiry_date <= now()->addDays($days);
    }
}