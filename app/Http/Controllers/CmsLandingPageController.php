<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LandingPageContent;
use Illuminate\Support\Facades\Auth;
class CmsLandingPageController extends Controller
{
    /**
     * Check if user is admin
     */
    private function checkAdminAuth()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return redirect('/login-cms');
        }
        return null;
    }

    /**
     * Display the CMS dashboard
     */
    public function index()
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $contents = LandingPageContent::orderBy('section')
            ->orderBy('order')
            ->get();

        // Group by section - keep as Collection for proper handling
        $contentsBySection = $contents->groupBy('section');
        
        // If no content exists, create empty collection structure
        if ($contentsBySection->isEmpty()) {
            $contentsBySection = collect([
                'hero' => collect([]),
                'features' => collect([]),
                'about' => collect([]),
                'services' => collect([]),
                'contact' => collect([])
            ]);
        }

        return view('cms.dashboard', [
            'contentsBySection' => $contentsBySection,
            'user' => Auth::user()
        ]);
    }

    /**
     * Show the form for editing content
     */
    public function edit($id)
    {
        $content = LandingPageContent::findOrFail($id);
        
        return Inertia::render('CMS/EditContent', [
            'content' => $content,
            'user' => Auth::user()
        ]);
    }

    /**
     * Update the specified content
     */
    public function update(Request $request, $id)
    {
        $content = LandingPageContent::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_active' => 'boolean',
            'order' => 'integer|min:0'
        ]);

        $content->update([
            'title' => $request->title,
            'content' => $request->content,
            'is_active' => $request->boolean('is_active', true),
            'order' => $request->order ?? $content->order,
            'metadata' => $request->metadata ?? $content->metadata
        ]);

        return redirect()->route('cms.dashboard')->with('success', 'Konten berhasil diperbarui!');
    }

    /**
     * Get all contents as JSON (for API)
     */
    public function getContents()
    {
        $contents = LandingPageContent::active()
            ->ordered()
            ->get()
            ->groupBy('section');

        return response()->json($contents);
    }

    /**
     * Update content via API
     */
    public function updateContent(Request $request, $id)
    {
        $content = LandingPageContent::findOrFail($id);
        
        $request->validate([
            'content' => 'required|string',
        ]);

        $content->update([
            'content' => $request->content,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Konten berhasil diperbarui!',
            'content' => $content
        ]);
    }

    /**
     * Toggle content active status
     */
    public function toggleActive($id)
    {
        $content = LandingPageContent::findOrFail($id);
        $content->update(['is_active' => !$content->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status konten berhasil diubah!',
            'is_active' => $content->is_active
        ]);
    }

    /**
     * Bulk update content order
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'contents' => 'required|array',
            'contents.*.id' => 'required|exists:landing_page_contents,id',
            'contents.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->contents as $contentData) {
            LandingPageContent::where('id', $contentData['id'])
                ->update(['order' => $contentData['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Urutan konten berhasil diperbarui!'
        ]);
    }

    /**
     * Display hosting packages for CMS
     */
    public function hostingPackages()
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $packages = \App\Models\HostingPackage::orderBy('sort_order')->get();

        return view('cms.hosting-packages.index', [
            'packages' => $packages,
            'user' => Auth::user()
        ]);
    }

    /**
     * Show form for creating hosting package
     */
    public function createHostingPackage()
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        return view('cms.hosting-packages.create', [
            'user' => Auth::user()
        ]);
    }

    /**
     * Store hosting package
     */
    public function storeHostingPackage(Request $request)
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'features' => 'required|array',
            'badge' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255'
        ]);

        \App\Models\HostingPackage::create([
            'name' => $request->name,
            'price' => $request->price,
            'features' => $request->features,
            'badge' => $request->badge,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $request->sort_order ?? 0,
            'image' => $request->image,
            'icon' => $request->icon
        ]);

        return redirect()->route('cms.hosting-packages.index')->with('success', 'Paket hosting berhasil ditambahkan!');
    }

    /**
     * Show form for editing hosting package
     */
    public function editHostingPackage($id)
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $package = \App\Models\HostingPackage::findOrFail($id);

        return view('cms.hosting-packages.edit', [
            'package' => $package,
            'user' => Auth::user()
        ]);
    }

    /**
     * Update hosting package
     */
    public function updateHostingPackage(Request $request, $id)
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $package = \App\Models\HostingPackage::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'features' => 'required|array',
            'badge' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255'
        ]);

        $package->update([
            'name' => $request->name,
            'price' => $request->price,
            'features' => $request->features,
            'badge' => $request->badge,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $request->sort_order ?? $package->sort_order,
            'image' => $request->image,
            'icon' => $request->icon
        ]);

        return redirect()->route('cms.hosting-packages.index')->with('success', 'Paket hosting berhasil diperbarui!');
    }

    /**
     * Delete hosting package
     */
    public function destroyHostingPackage($id)
    {
        $authCheck = $this->checkAdminAuth();
        if ($authCheck) return $authCheck;

        $package = \App\Models\HostingPackage::findOrFail($id);
        $package->delete();

        return redirect()->route('cms.hosting-packages.index')->with('success', 'Paket hosting berhasil dihapus!');
    }
}
