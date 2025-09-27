<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HostingPackage;

class HostingPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Starter',
                'description' => 'Perfect untuk website personal dan blog sederhana',
                'price' => 29000,
                'billing_cycle' => 'monthly',
                'storage_gb' => 5,
                'bandwidth_gb' => 50,
                'email_accounts' => 5,
                'databases' => 1,
                'domains' => 1,
                'ssl_certificate' => true,
                'backup_daily' => false,
                'support_24_7' => false,
                'features' => json_encode([
                    'cPanel Control Panel',
                    'Website Builder',
                    'Free SSL Certificate',
                    'Email Support'
                ]),
                'badge' => null,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Professional',
                'description' => 'Ideal untuk bisnis kecil dan website e-commerce',
                'price' => 59000,
                'billing_cycle' => 'monthly',
                'storage_gb' => 25,
                'bandwidth_gb' => 250,
                'email_accounts' => 25,
                'databases' => 5,
                'domains' => 5,
                'ssl_certificate' => true,
                'backup_daily' => true,
                'support_24_7' => false,
                'features' => json_encode([
                    'cPanel Control Panel',
                    'Website Builder',
                    'Free SSL Certificate',
                    'Daily Backup',
                    'Email & Chat Support',
                    'WordPress Toolkit'
                ]),
                'badge' => 'Popular',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Business',
                'description' => 'Solusi terbaik untuk bisnis menengah dengan traffic tinggi',
                'price' => 99000,
                'billing_cycle' => 'monthly',
                'storage_gb' => 100,
                'bandwidth_gb' => 1000,
                'email_accounts' => 100,
                'databases' => 25,
                'domains' => 25,
                'ssl_certificate' => true,
                'backup_daily' => true,
                'support_24_7' => true,
                'features' => json_encode([
                    'cPanel Control Panel',
                    'Website Builder',
                    'Free SSL Certificate',
                    'Daily Backup',
                    '24/7 Priority Support',
                    'WordPress Toolkit',
                    'Advanced Security',
                    'CDN Integration'
                ]),
                'badge' => 'Best Value',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Paket premium untuk perusahaan besar dengan kebutuhan khusus',
                'price' => 199000,
                'billing_cycle' => 'monthly',
                'storage_gb' => 500,
                'bandwidth_gb' => 5000,
                'email_accounts' => 500,
                'databases' => 100,
                'domains' => 100,
                'ssl_certificate' => true,
                'backup_daily' => true,
                'support_24_7' => true,
                'features' => json_encode([
                    'cPanel Control Panel',
                    'Website Builder',
                    'Free SSL Certificate',
                    'Daily Backup',
                    '24/7 Dedicated Support',
                    'WordPress Toolkit',
                    'Advanced Security',
                    'CDN Integration',
                    'Dedicated IP',
                    'Custom Configuration'
                ]),
                'badge' => 'Premium',
                'is_active' => true,
                'sort_order' => 4
            ]
        ];

        foreach ($packages as $package) {
            HostingPackage::create($package);
        }
    }
}
