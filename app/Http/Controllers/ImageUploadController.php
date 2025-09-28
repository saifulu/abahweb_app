<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            // Store in public/images directory
            $path = $image->move(public_path('images'), $filename);
            
            return response()->json([
                'success' => true,
                'filename' => $filename,
                'url' => asset('images/' . $filename)
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No image file found'
        ], 400);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'filename' => 'required|string',
        ]);

        $filename = $request->input('filename');
        $filePath = public_path('images/' . $filename);

        if (file_exists($filePath)) {
            unlink($filePath);
            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Image not found'
        ], 404);
    }

    public function list()
    {
        $imagesPath = public_path('images');
        
        if (!is_dir($imagesPath)) {
            return response()->json([
                'success' => true,
                'images' => []
            ]);
        }

        $files = scandir($imagesPath);
        $images = [];

        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif', 'svg'])) {
                $images[] = [
                    'filename' => $file,
                    'url' => asset('images/' . $file),
                    'size' => filesize($imagesPath . '/' . $file)
                ];
            }
        }

        return response()->json([
            'success' => true,
            'images' => $images
        ]);
    }
}