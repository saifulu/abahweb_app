<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin AbahWeb',
            'email' => 'admin@abahweb.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        User::create([
            'name' => 'User Demo',
            'email' => 'user@abahweb.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'email_verified_at' => now(),
            'is_active' => true,
        ]);
    }
}