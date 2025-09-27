<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    protected $fillable = [
        'section',
        'key',
        'title',
        'content',
        'image_url',
        'button_text',
        'button_url',
        'metadata',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean'
    ];

    // Scope untuk konten aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk section tertentu
    public function scopeOfSection($query, $section)
    {
        return $query->where('section', $section);
    }

    // Scope untuk key tertentu
    public function scopeOfKey($query, $key)
    {
        return $query->where('key', $key);
    }
}
