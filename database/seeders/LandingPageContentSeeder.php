<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LandingPageContent;

class LandingPageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // Hero Section
            [
                'section' => 'hero',
                'type' => 'h1',
                'key' => 'hero_title',
                'title' => 'Hero Title',
                'content' => 'AbahWeb - Professional Hosting & Tunneling Platform',
                'order' => 1,
                'is_active' => true
            ],
            [
                'section' => 'hero',
                'type' => 'span',
                'key' => 'hero_subtitle',
                'title' => 'Hero Subtitle',
                'content' => 'Solusi hosting dan tunneling terdepan dengan teknologi enterprise-grade untuk bisnis modern',
                'order' => 2,
                'is_active' => true
            ],
            [
                'section' => 'hero',
                'type' => 'span',
                'key' => 'hero_description',
                'title' => 'Hero Description',
                'content' => 'Platform hosting dan tunneling yang dirancang khusus untuk developer, startup, dan enterprise dengan infrastruktur cloud terdistribusi dan keamanan tingkat militer.',
                'order' => 3,
                'is_active' => true
            ],
            [
                'section' => 'hero',
                'type' => 'span',
                'key' => 'hero_button_text',
                'title' => 'Hero Button Text',
                'content' => 'Mulai Sekarang',
                'metadata' => ['button_url' => '/register'],
                'order' => 4,
                'is_active' => true
            ],
            [
                'section' => 'hero',
                'type' => 'p',
                'key' => 'hero_additional_info',
                'title' => 'Hero Additional Info',
                'content' => 'Bergabunglah dengan ribuan developer dan perusahaan yang mempercayai AbahWeb untuk infrastruktur digital mereka.',
                'order' => 5,
                'is_active' => true
            ],

            // About Section
            [
                'section' => 'about',
                'type' => 'h1',
                'key' => 'about_title',
                'title' => 'About Title',
                'content' => 'Mengapa Memilih AbahWeb?',
                'order' => 1,
                'is_active' => true
            ],
            [
                'section' => 'about',
                'type' => 'span',
                'key' => 'about_subtitle',
                'title' => 'About Subtitle',
                'content' => 'Teknologi Terdepan untuk Masa Depan Digital',
                'order' => 2,
                'is_active' => true
            ],
            [
                'section' => 'about',
                'type' => 'span',
                'key' => 'about_description',
                'title' => 'About Description',
                'content' => 'Kami menyediakan infrastruktur hosting dan tunneling yang handal dengan teknologi terdepan untuk mendukung pertumbuhan bisnis Anda.',
                'order' => 3,
                'is_active' => true
            ],
            [
                'section' => 'about',
                'type' => 'span',
                'key' => 'about_features',
                'title' => 'About Features',
                'content' => 'Dengan uptime 99.9%, keamanan berlapis, dan dukungan 24/7, AbahWeb adalah pilihan terbaik untuk infrastruktur digital Anda.',
                'order' => 4,
                'is_active' => true
            ],
            [
                'section' => 'about',
                'type' => 'p',
                'key' => 'about_commitment',
                'title' => 'About Commitment',
                'content' => 'Komitmen kami adalah memberikan layanan terbaik dengan teknologi terdepan dan dukungan pelanggan yang responsif untuk memastikan kesuksesan bisnis digital Anda.',
                'order' => 5,
                'is_active' => true
            ],

            // CTA Section
            [
                'section' => 'cta',
                'type' => 'h1',
                'key' => 'cta_title',
                'title' => 'CTA Title',
                'content' => 'Siap Memulai Perjalanan Digital Anda?',
                'order' => 1,
                'is_active' => true
            ],
            [
                'section' => 'cta',
                'type' => 'span',
                'key' => 'cta_subtitle',
                'title' => 'CTA Subtitle',
                'content' => 'Bergabunglah dengan ribuan developer dan perusahaan yang mempercayai AbahWeb',
                'order' => 2,
                'is_active' => true
            ],
            [
                'section' => 'cta',
                'type' => 'span',
                'key' => 'cta_button_text',
                'title' => 'CTA Button Text',
                'content' => 'Daftar Gratis Sekarang',
                'metadata' => ['button_url' => '/register'],
                'order' => 3,
                'is_active' => true
            ],
            [
                'section' => 'cta',
                'type' => 'span',
                'key' => 'cta_description',
                'title' => 'CTA Description',
                'content' => 'Dapatkan akses ke platform hosting dan tunneling terbaik dengan trial gratis 30 hari',
                'order' => 4,
                'is_active' => true
            ],
            [
                'section' => 'cta',
                'type' => 'p',
                'key' => 'cta_guarantee',
                'title' => 'CTA Guarantee',
                'content' => 'Tidak ada biaya tersembunyi. Batalkan kapan saja. Dukungan 24/7 tersedia untuk membantu Anda memulai.',
                'order' => 5,
                'is_active' => true
            ]
        ];

        foreach ($contents as $content) {
            LandingPageContent::updateOrCreate(
                ['key' => $content['key']],
                $content
            );
        }
    }
}
