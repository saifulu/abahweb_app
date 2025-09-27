<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TunnelingService extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_name',
        'tunnel_type',
        'local_ip',
        'local_port',
        'remote_ip',
        'remote_port',
        'protocol',
        'status',
        'mikrotik_config',
        'bandwidth_limit',
        'expiry_date',
        'auto_renew',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'datetime',
            'auto_renew' => 'boolean',
            'mikrotik_config' => 'array',
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

    public function scopeByProtocol($query, $protocol)
    {
        return $query->where('protocol', $protocol);
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