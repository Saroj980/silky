<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GeneralPage;
use Illuminate\Http\Request;

class GeneralPageController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('slug')) {
            $slug = $request->query('slug');
            $cleanSlug = trim(ltrim($slug, '/'));
            $page = GeneralPage::where('slug', $cleanSlug)
                ->orWhere('slug', '/' . $cleanSlug)
                ->orWhere('slug', 'blog/' . $cleanSlug)
                ->first();

            if ($page) {
                return response()->json($page);
            }
            return response()->json(['message' => 'General page not found'], 404);
        }

        return response()->json(GeneralPage::orderBy('id', 'asc')->get());
    }

    public function showBySlug($slug)
    {
        $cleanSlug = trim(ltrim($slug, '/'));
        $page = GeneralPage::where('slug', $cleanSlug)
            ->orWhere('slug', '/' . $cleanSlug)
            ->orWhere('slug', 'blog/' . $cleanSlug)
            ->first();

        if (!$page) {
            return response()->json(['message' => 'General page not found'], 404);
        }

        return response()->json($page);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:general_pages,slug',
            'subtitle' => 'nullable|string',
            'pageType' => 'nullable|string',
            'status' => 'nullable|string',
            'isActive' => 'nullable|boolean',
            'featuredImage' => 'nullable|string',
            'content' => 'nullable|string',
            'seoTitle' => 'nullable|string',
            'seoDescription' => 'nullable|string',
            'seoKeywords' => 'nullable|string',
            'ogImage' => 'nullable|string',
            'allowIndexing' => 'nullable|boolean',
            'author' => 'nullable|string',
        ]);

        $page = GeneralPage::create($validated);

        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $page = GeneralPage::find($id);
        if (!$page && $request->has('slug')) {
            $page = GeneralPage::where('slug', $request->slug)->first();
        }

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:general_pages,slug,' . $page->id,
            'subtitle' => 'nullable|string',
            'pageType' => 'nullable|string',
            'status' => 'nullable|string',
            'isActive' => 'nullable|boolean',
            'featuredImage' => 'nullable|string',
            'content' => 'nullable|string',
            'seoTitle' => 'nullable|string',
            'seoDescription' => 'nullable|string',
            'seoKeywords' => 'nullable|string',
            'ogImage' => 'nullable|string',
            'allowIndexing' => 'nullable|boolean',
            'author' => 'nullable|string',
        ]);

        $page->update($validated);

        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = GeneralPage::find($id);
        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $page->delete();

        return response()->json(['message' => 'Page deleted successfully']);
    }
}
