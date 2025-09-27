<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\HomepageContent;
use App\Models\HostingPackage;
use App\Models\Logo;

class WelcomeController extends Controller
{
    public function index()
    {
        // Get active homepage content ordered by sort_order field
        $homepageContent = HomepageContent::active()
            ->orderBy('sort_order')
            ->get()
            ->groupBy('section');

        // Get active hosting packages for pricing section
        $hostingPackages = HostingPackage::active()
            ->orderBy('price')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'description' => $package->description,
                    'price' => $package->price,
                    'billing_cycle' => $package->billing_cycle,
                    'badge' => $package->badge,
                    'storage_gb' => $package->storage_gb,
                    'bandwidth_gb' => $package->bandwidth_gb,
                    'domains' => $package->domains,
                    'email_accounts' => $package->email_accounts,
                    'databases' => $package->databases,
                    'ssl_certificate' => $package->ssl_certificate,
                    'backup_daily' => $package->backup_daily,
                    'support_24_7' => $package->support_24_7,
                    'features' => $package->features,
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

        // Prepare content data with fallbacks
        $content = [
            'hero' => $homepageContent->get('hero', collect())->first(),
            'features' => $homepageContent->get('features', collect()),
            'about' => $homepageContent->get('about', collect())->first(),
            'testimonials' => $homepageContent->get('testimonials', collect()),
            'cta' => $homepageContent->get('cta', collect())->first(),
            'stats' => $homepageContent->get('stats', collect()),
        ];

        return Inertia::render('Welcome', [
            'auth' => Auth::check() ? ['user' => Auth::user()] : ['user' => null],
            'laravelVersion' => app()->version(),
            'phpVersion' => PHP_VERSION,
            'content' => $content,
            'hostingPackages' => $hostingPackages,
            'logos' => $logos,
        ]);
    }
}
