<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SvgUploadController extends Controller
{
    /**
     * Display the SVG upload interface
     */
    public function index()
    {
        $svgFiles = $this->getSvgFiles();
        
        return Inertia::render('SvgUpload', [
            'svgFiles' => $svgFiles
        ]);
    }

    /**
     * Handle SVG file upload
     */
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'svg_file' => [
                'required',
                'file',
                'mimes:svg',
                'max:2048', // 2MB max
                function ($attribute, $value, $fail) {
                    // Additional SVG validation
                    $content = file_get_contents($value->getRealPath());
                    if (!$this->isValidSvg($content)) {
                        $fail('File yang diupload bukan SVG yang valid.');
                    }
                },
            ],
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $file = $request->file('svg_file');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $customName = $request->input('name', $originalName);
            
            // Generate unique filename
            $filename = Str::slug($customName) . '_' . time() . '.svg';
            
            // Store in public disk (storage/app/public/svgs)
            $path = $file->storeAs('svgs', $filename, 'public');
            
            // Store metadata in database (optional)
            $this->storeSvgMetadata([
                'filename' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'custom_name' => $customName,
                'description' => $request->input('description'),
                'path' => $path,
                'size' => $file->getSize(),
                'uploaded_at' => now()
            ]);

            return back()->with('success', 'SVG berhasil diupload! File tersimpan permanen di: ' . $path);
            
        } catch (\Exception $e) {
            return back()->withErrors(['upload' => 'Gagal mengupload file: ' . $e->getMessage()]);
        }
    }

    /**
     * Delete SVG file
     */
    public function delete(Request $request)
    {
        $filename = $request->input('filename');
        
        if (!$filename) {
            return back()->withErrors(['delete' => 'Nama file tidak valid']);
        }

        try {
            $path = 'svgs/' . $filename;
            
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                $this->deleteSvgMetadata($filename);
                
                return back()->with('success', 'SVG berhasil dihapus');
            } else {
                return back()->withErrors(['delete' => 'File tidak ditemukan']);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['delete' => 'Gagal menghapus file: ' . $e->getMessage()]);
        }
    }

    /**
     * Get SVG file content for preview
     */
    public function preview($filename)
    {
        $path = 'svgs/' . $filename;
        
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'SVG file not found');
        }

        $content = Storage::disk('public')->get($path);
        
        return response($content)
            ->header('Content-Type', 'image/svg+xml')
            ->header('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    }

    /**
     * Get all SVG files
     */
    private function getSvgFiles()
    {
        $files = Storage::disk('public')->files('svgs');
        $svgFiles = [];

        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'svg') {
                $filename = basename($file);
                $svgFiles[] = [
                    'filename' => $filename,
                    'url' => asset('storage/' . $file),
                    'size' => Storage::disk('public')->size($file),
                    'modified' => Storage::disk('public')->lastModified($file),
                    'preview_url' => route('svg.preview', $filename)
                ];
            }
        }

        return $svgFiles;
    }

    /**
     * Validate SVG content
     */
    private function isValidSvg($content)
    {
        // Basic SVG validation
        if (strpos($content, '<svg') === false) {
            return false;
        }

        // Check for potentially dangerous content
        $dangerousPatterns = [
            '<script',
            'javascript:',
            'onload=',
            'onerror=',
            'onclick=',
            'onmouseover='
        ];

        foreach ($dangerousPatterns as $pattern) {
            if (stripos($content, $pattern) !== false) {
                return false;
            }
        }

        return true;
    }

    /**
     * Store SVG metadata (you can implement database storage here)
     */
    private function storeSvgMetadata($data)
    {
        // For now, we'll store in a JSON file
        // You can implement database storage later
        $metadataPath = 'svg_metadata.json';
        
        $existingData = [];
        if (Storage::disk('public')->exists($metadataPath)) {
            $existingData = json_decode(Storage::disk('public')->get($metadataPath), true) ?? [];
        }

        $existingData[$data['filename']] = $data;
        
        Storage::disk('public')->put($metadataPath, json_encode($existingData, JSON_PRETTY_PRINT));
    }

    /**
     * Delete SVG metadata
     */
    private function deleteSvgMetadata($filename)
    {
        $metadataPath = 'svg_metadata.json';
        
        if (Storage::disk('public')->exists($metadataPath)) {
            $existingData = json_decode(Storage::disk('public')->get($metadataPath), true) ?? [];
            unset($existingData[$filename]);
            Storage::disk('public')->put($metadataPath, json_encode($existingData, JSON_PRETTY_PRINT));
        }
    }
}