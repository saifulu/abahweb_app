<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageUploadController extends Controller
{
    /**
     * Upload image for hosting packages or CMS content
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|in:hosting-package,cms-content,hero-image,logo',
            'name' => 'nullable|string|max:255'
        ]);

        try {
            $file = $request->file('image');
            $type = $request->input('type');
            $customName = $request->input('name');
            
            // Generate filename
            $filename = $this->generateFilename($file, $type, $customName);
            
            // Determine storage path based on type
            $storagePath = $this->getStoragePath($type);
            
            // Store the file in public disk (will be accessible via URL)
            $path = $file->storeAs($storagePath, $filename, 'public');
            
            // Also copy to public/images for direct access (for VPS/GitHub deployment)
            $publicPath = public_path('images/' . $filename);
            copy($file->getPathname(), $publicPath);
            
            return response()->json([
                'success' => true,
                'message' => 'Gambar berhasil diupload',
                'data' => [
                    'filename' => $filename,
                    'path' => $path,
                    'url' => asset('images/' . $filename),
                    'storage_url' => Storage::url($path),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType()
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupload gambar: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete uploaded image
     */
    public function delete(Request $request)
    {
        $request->validate([
            'filename' => 'required|string'
        ]);

        try {
            $filename = $request->input('filename');
            
            // Delete from storage
            $storagePath = 'images/' . $filename;
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
            
            // Delete from public directory
            $publicPath = public_path('images/' . $filename);
            if (file_exists($publicPath)) {
                unlink($publicPath);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Gambar berhasil dihapus'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus gambar: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * List all uploaded images
     */
    public function list(Request $request)
    {
        try {
            $type = $request->input('type', 'all');
            $publicImagesPath = public_path('images');
            
            if (!is_dir($publicImagesPath)) {
                return response()->json([
                    'success' => true,
                    'data' => []
                ]);
            }
            
            $files = scandir($publicImagesPath);
            $images = [];
            
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') continue;
                
                $filePath = $publicImagesPath . '/' . $file;
                if (is_file($filePath)) {
                    $extension = pathinfo($file, PATHINFO_EXTENSION);
                    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
                    
                    if (in_array(strtolower($extension), $allowedExtensions)) {
                        $images[] = [
                            'filename' => $file,
                            'url' => asset('images/' . $file),
                            'size' => filesize($filePath),
                            'modified' => filemtime($filePath),
                            'extension' => $extension
                        ];
                    }
                }
            }
            
            // Sort by modification time (newest first)
            usort($images, function($a, $b) {
                return $b['modified'] - $a['modified'];
            });
            
            return response()->json([
                'success' => true,
                'data' => $images
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar gambar: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate filename based on type and custom name
     */
    private function generateFilename($file, $type, $customName = null)
    {
        $extension = $file->getClientOriginalExtension();
        
        if ($customName) {
            $name = Str::slug($customName);
        } else {
            $name = $type . '_' . time() . '_' . Str::random(8);
        }
        
        return $name . '.' . $extension;
    }

    /**
     * Get storage path based on type
     */
    private function getStoragePath($type)
    {
        $paths = [
            'hosting-package' => 'images/hosting-packages',
            'cms-content' => 'images/cms-content',
            'hero-image' => 'images/hero',
            'logo' => 'images/logos'
        ];
        
        return $paths[$type] ?? 'images/misc';
    }
}