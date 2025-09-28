<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\HomepageContent;
use App\Models\LandingPageContent;
use App\Models\HostingPackage;
use App\Models\Logo;

class WelcomeController extends Controller
{
    public function index()
    {
        // Get active landing page content ordered by order field
        $landingPageContent = LandingPageContent::active()
            ->orderBy('order')
            ->get()
            ->groupBy('section');

        // Get active hosting packages for pricing section
        $hostingPackages = HostingPackage::active()
            ->orderBy('sort_order')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'description' => $package->description,
                    'price' => $package->price,
                    'billing_cycle' => $package->billing_cycle,
                    'badge' => $package->badge,
                    'image' => $package->image,
                    'icon' => $package->icon,
                    'storage_gb' => $package->storage_gb,
                    'bandwidth_gb' => $package->bandwidth_gb,
                    'domains' => $package->domains,
                    'email_accounts' => $package->email_accounts,
                    'databases' => $package->databases,
                    'ssl_certificate' => $package->ssl_certificate,
                    'backup_daily' => $package->backup_daily,
                    'support_24_7' => $package->support_24_7,
                    'features' => is_string($package->features) ? json_decode($package->features, true) : $package->features,
                ];
            });

        // Get active logos
        $logos = Logo::active()
            ->get()
            ->keyBy('type')
            ->map(function ($logo) {
                return [
                    'id' => $logo->id,
                    'name' => $logo->name,
                    'url' => $logo->url,
                    'type' => $logo->type,
                ];
            });

        // Prepare content data with fallbacks and better structure
        $content = [
            'hero' => $this->prepareContentSection($landingPageContent->get('hero', collect())),
            'about' => $this->prepareContentSection($landingPageContent->get('about', collect())),
            'cta' => $this->prepareContentSection($landingPageContent->get('cta', collect())),
        ];

        // Add fallback data if no content exists in database
        if (empty($content['hero'])) {
            $content['hero'] = [
                'h1' => 'Next-Gen Hosting Platform',
                'span' => 'Hosting',
                'p' => 'Revolusioner dalam teknologi hosting dan tunneling dengan AI-powered infrastructure, real-time analytics, dan security tingkat enterprise untuk masa depan digital Anda.'
            ];
        }

        if (empty($content['about'])) {
            $content['about'] = [
                'h2' => 'Tentang AbahWeb',
                'p' => 'Platform hosting terdepan dengan teknologi AI dan infrastruktur modern untuk kebutuhan digital Anda.'
            ];
        }

        if (empty($content['cta'])) {
            $content['cta'] = [
                'h2' => 'Siap Memulai?',
                'p' => 'Bergabunglah dengan ribuan pengguna yang telah mempercayai AbahWeb untuk kebutuhan hosting mereka.',
                'button' => 'Mulai Sekarang'
            ];
        }

        return Inertia::render('Welcome', [
            'auth' => Auth::check() ? ['user' => Auth::user()] : ['user' => null],
            'laravelVersion' => app()->version(),
            'phpVersion' => PHP_VERSION,
            'content' => $content,
            'hostingPackages' => $hostingPackages,
            'logos' => $logos,
        ]);
    }

    /**
     * Prepare content section from database records
     */
    private function prepareContentSection($contents)
    {
        $section = [];
        foreach ($contents as $content) {
            $section[$content->type] = $content->content;
        }
        return $section;
    }
}
