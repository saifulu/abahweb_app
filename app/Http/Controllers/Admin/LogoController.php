<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logos = Logo::orderBy('type')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($logo) {
                return [
                    'id' => $logo->id,
                    'name' => $logo->name,
                    'type' => $logo->type,
                    'file_name' => $logo->file_name,
                    'file_size' => $logo->file_size,
                    'formatted_size' => $logo->formatted_size,
                    'mime_type' => $logo->mime_type,
                    'width' => $logo->width,
                    'height' => $logo->height,
                    'description' => $logo->description,
                    'is_active' => $logo->is_active,
                    'url' => $logo->url,
                    'created_at' => $logo->created_at,
                    'updated_at' => $logo->updated_at,
                ];
            });

        return Inertia::render('Admin/Logos/Index', [
            'logos' => $logos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Logos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:main,secondary,favicon,footer,header,dark,light',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'logo_file' => 'required|file|mimes:png,jpg,jpeg,svg,ico|max:2048'
        ]);

        $file = $request->file('logo_file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('logos', $fileName, 'public');

        // Get image dimensions if it's an image
        $width = null;
        $height = null;
        if (in_array($file->getMimeType(), ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'])) {
            $fullPath = storage_path('app/public/' . $filePath);
            if ($file->getMimeType() !== 'image/svg+xml') {
                $imageSize = getimagesize($fullPath);
                if ($imageSize) {
                    $width = $imageSize[0];
                    $height = $imageSize[1];
                }
            }
        }

        Logo::create([
            'name' => $request->name,
            'type' => $request->type,
            'file_path' => $filePath,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'width' => $width,
            'height' => $height,
            'description' => $request->description,
            'is_active' => $request->boolean('is_active', true)
        ]);

        return redirect()->route('admin.logos.index')
            ->with('success', 'Logo berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Logo $logo)
    {
        return Inertia::render('Admin/Logos/Show', [
            'logo' => [
                'id' => $logo->id,
                'name' => $logo->name,
                'type' => $logo->type,
                'file_name' => $logo->file_name,
                'file_size' => $logo->file_size,
                'formatted_size' => $logo->formatted_size,
                'mime_type' => $logo->mime_type,
                'width' => $logo->width,
                'height' => $logo->height,
                'description' => $logo->description,
                'is_active' => $logo->is_active,
                'url' => $logo->url,
                'created_at' => $logo->created_at,
                'updated_at' => $logo->updated_at,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Logo $logo)
    {
        return Inertia::render('Admin/Logos/Edit', [
            'logo' => [
                'id' => $logo->id,
                'name' => $logo->name,
                'type' => $logo->type,
                'file_name' => $logo->file_name,
                'file_size' => $logo->file_size,
                'formatted_size' => $logo->formatted_size,
                'mime_type' => $logo->mime_type,
                'width' => $logo->width,
                'height' => $logo->height,
                'description' => $logo->description,
                'is_active' => $logo->is_active,
                'url' => $logo->url,
                'created_at' => $logo->created_at,
                'updated_at' => $logo->updated_at,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logo $logo)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:main,secondary,favicon,footer,header,dark,light',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'logo_file' => 'nullable|file|mimes:png,jpg,jpeg,svg,ico|max:2048'
        ]);

        $updateData = [
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description,
            'is_active' => $request->boolean('is_active', true)
        ];

        // Handle file upload if new file is provided
        if ($request->hasFile('logo_file')) {
            // Delete old file
            if ($logo->file_path && Storage::disk('public')->exists($logo->file_path)) {
                Storage::disk('public')->delete($logo->file_path);
            }

            $file = $request->file('logo_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('logos', $fileName, 'public');

            // Get image dimensions if it's an image
            $width = null;
            $height = null;
            if (in_array($file->getMimeType(), ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'])) {
                $fullPath = storage_path('app/public/' . $filePath);
                if ($file->getMimeType() !== 'image/svg+xml') {
                    $imageSize = getimagesize($fullPath);
                    if ($imageSize) {
                        $width = $imageSize[0];
                        $height = $imageSize[1];
                    }
                }
            }

            $updateData = array_merge($updateData, [
                'file_path' => $filePath,
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'width' => $width,
                'height' => $height,
            ]);
        }

        $logo->update($updateData);

        return redirect()->route('admin.logos.index')
            ->with('success', 'Logo berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logo $logo)
    {
        // Delete file from storage
        if ($logo->file_path && Storage::disk('public')->exists($logo->file_path)) {
            Storage::disk('public')->delete($logo->file_path);
        }

        $logo->delete();

        return redirect()->route('admin.logos.index')
            ->with('success', 'Logo berhasil dihapus.');
    }
}
