<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = HomepageContent::orderBy('section')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($content) {
                $content->metadata = json_decode($content->metadata, true);
                return $content;
            });

        return Inertia::render('Admin/HomepageContent/Index', [
            'contents' => $contents
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/HomepageContent/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image_url' => 'nullable|url',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|url',
            'metadata' => 'nullable|array',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['metadata'] = json_encode($validated['metadata'] ?? []);

        HomepageContent::create($validated);

        return redirect()->route('admin.homepage-content.index')
            ->with('success', 'Konten homepage berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HomepageContent $homepageContent)
    {
        $homepageContent->metadata = json_decode($homepageContent->metadata, true);
        
        return Inertia::render('Admin/HomepageContent/Show', [
            'content' => $homepageContent
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomepageContent $homepageContent)
    {
        $homepageContent->metadata = json_decode($homepageContent->metadata, true);
        
        return Inertia::render('Admin/HomepageContent/Edit', [
            'content' => $homepageContent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomepageContent $homepageContent)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image_url' => 'nullable|url',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|url',
            'metadata' => 'nullable|array',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['metadata'] = json_encode($validated['metadata'] ?? []);

        $homepageContent->update($validated);

        return redirect()->route('admin.homepage-content.index')
            ->with('success', 'Konten homepage berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomepageContent $homepageContent)
    {
        $homepageContent->delete();

        return redirect()->route('admin.homepage-content.index')
            ->with('success', 'Konten homepage berhasil dihapus.');
    }
}
