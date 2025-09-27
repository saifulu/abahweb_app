<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HostingPackage extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'billing_cycle',
        'storage_gb',
        'bandwidth_gb',
        'email_accounts',
        'databases',
        'domains',
        'ssl_certificate',
        'backup_daily',
        'support_24_7',
        'features',
        'badge',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'ssl_certificate' => 'boolean',
        'backup_daily' => 'boolean',
        'support_24_7' => 'boolean',
        'is_active' => 'boolean',
        'features' => 'array'
    ];

    // Scope untuk paket aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Accessor untuk format harga
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }
}
