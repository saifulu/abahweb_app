<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HostingPackage;
use App\Models\HomepageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'hosting_packages' => HostingPackage::count(),
            'active_packages' => HostingPackage::where('is_active', true)->count(),
            'homepage_contents' => HomepageContent::count(),
            'active_contents' => HomepageContent::where('is_active', true)->count(),
        ];

        $recent_packages = HostingPackage::latest()->take(5)->get();
        $recent_contents = HomepageContent::latest()->take(5)->get();

        return Inertia::render('Admin/CmsDashboard', [
            'stats' => $stats,
            'recent_packages' => $recent_packages,
            'recent_contents' => $recent_contents,
        ]);
    }
}
