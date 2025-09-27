<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HostingPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HostingPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = HostingPackage::orderBy('sort_order')->get()->map(function ($package) {
            $package->features = json_decode($package->features, true);
            return $package;
        });

        return Inertia::render('Admin/HostingPackages/Index', [
            'packages' => $packages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/HostingPackages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:monthly,yearly',
            'storage_gb' => 'required|integer|min:1',
            'bandwidth_gb' => 'required|integer|min:1',
            'email_accounts' => 'required|integer|min:1',
            'databases' => 'required|integer|min:1',
            'domains' => 'required|integer|min:1',
            'ssl_certificate' => 'boolean',
            'backup_daily' => 'boolean',
            'support_24_7' => 'boolean',
            'features' => 'array',
            'badge' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['features'] = json_encode($validated['features'] ?? []);

        HostingPackage::create($validated);

        return redirect()->route('admin.hosting-packages.index')
            ->with('success', 'Paket hosting berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HostingPackage $hostingPackage)
    {
        $hostingPackage->features = json_decode($hostingPackage->features, true);
        
        return Inertia::render('Admin/HostingPackages/Show', [
            'package' => $hostingPackage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HostingPackage $hostingPackage)
    {
        $hostingPackage->features = json_decode($hostingPackage->features, true);
        
        return Inertia::render('Admin/HostingPackages/Edit', [
            'package' => $hostingPackage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HostingPackage $hostingPackage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'billing_cycle' => 'required|in:monthly,yearly',
            'storage_gb' => 'required|integer|min:1',
            'bandwidth_gb' => 'required|integer|min:1',
            'email_accounts' => 'required|integer|min:1',
            'databases' => 'required|integer|min:1',
            'domains' => 'required|integer|min:1',
            'ssl_certificate' => 'boolean',
            'backup_daily' => 'boolean',
            'support_24_7' => 'boolean',
            'features' => 'array',
            'badge' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['features'] = json_encode($validated['features'] ?? []);

        $hostingPackage->update($validated);

        return redirect()->route('admin.hosting-packages.index')
            ->with('success', 'Paket hosting berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HostingPackage $hostingPackage)
    {
        $hostingPackage->delete();

        return redirect()->route('admin.hosting-packages.index')
            ->with('success', 'Paket hosting berhasil dihapus.');
    }
}
