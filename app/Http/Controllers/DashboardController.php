<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\HostingService;
use App\Models\TunnelingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $stats = [];
        
        if ($user->isAdmin()) {
            $stats = [
                'total_users' => User::count(),
                'hosting_services' => HostingService::count(),
                'tunneling_services' => TunnelingService::count(),
                'active_services' => HostingService::where('status', 'active')->count() + 
                                   TunnelingService::where('status', 'active')->count(),
            ];
        } else {
            $stats = [
                'hosting_services' => $user->hostingServices()->count(),
                'tunneling_services' => $user->tunnelingServices()->count(),
                'active_services' => $user->hostingServices()->where('status', 'active')->count() + 
                                   $user->tunnelingServices()->where('status', 'active')->count(),
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
}