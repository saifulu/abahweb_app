<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingPageContent extends Model
{
    protected $fillable = [
        'section',
        'type',
        'key',
        'title',
        'content',
        'metadata',
        'order',
        'is_active'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean'
    ];

    // Scope untuk mendapatkan konten aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk mendapatkan konten berdasarkan section
    public function scopeBySection($query, $section)
    {
        return $query->where('section', $section);
    }

    // Scope untuk mendapatkan konten berdasarkan type
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Method untuk mendapatkan konten yang diurutkan
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    // Method untuk mendapatkan semua konten yang dikelompokkan berdasarkan section
    public static function getContentBySection()
    {
        return self::active()
            ->ordered()
            ->get()
            ->groupBy('section');
    }

    // Method untuk mendapatkan konten berdasarkan key
    public static function getByKey($key)
    {
        return self::where('key', $key)->first();
    }
}
