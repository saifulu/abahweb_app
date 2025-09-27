<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HostingPackage;
use Inertia\Inertia;

class HostingPackageController extends Controller
{
    public function index()
    {
        $packages = HostingPackage::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($package) {
                $package->features = json_decode($package->features, true);
                return $package;
            });

        return Inertia::render('HostingPackages', [
            'packages' => $packages
        ]);
    }

    public function show(HostingPackage $package)
    {
        $package->features = json_decode($package->features, true);
        
        return Inertia::render('HostingPackageDetail', [
            'package' => $package
        ]);
    }
}
