<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['success' => false, 'error' => 'No file uploaded'], 400);
        }

        $file = $request->file('file');
        $filename = time() . '-' . preg_replace('/[^a-zA-Z0-9.\-_]/', '', $file->getClientOriginalName());

        // Target path in public/uploads directory of project root
        $destinationPath = base_path('../public/uploads');
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        $file->move($destinationPath, $filename);

        return response()->json([
            'success' => true,
            'url' => '/uploads/' . $filename,
        ]);
    }
}
