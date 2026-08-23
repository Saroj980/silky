<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductPage;
use App\Models\ProductPageSection;
use Illuminate\Http\Request;

class ProductPageController extends Controller
{
    public function index()
    {
        return response()->json(ProductPage::with('sections')->get());
    }

    public function showBySlug($slug)
    {
        $page = ProductPage::where('slug', $slug)->with(['sections' => function($q) {
            $q->orderBy('order', 'asc');
        }])->first();

        if (!$page) {
            return response()->json(['message' => 'Product page not found'], 404);
        }

        return response()->json($page);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:product_pages,slug',
            'category' => 'required|string',
            'heroImage' => 'required|string',
            'metaTitle' => 'nullable|string',
            'metaDescription' => 'nullable|string',
            'isPublished' => 'boolean',
        ]);

        $page = ProductPage::create($validated);

        return response()->json($page->load('sections'), 201);
    }

    public function update(Request $request, $id)
    {
        $page = ProductPage::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:product_pages,slug,' . $id,
            'category' => 'sometimes|string',
            'heroImage' => 'sometimes|string',
            'metaTitle' => 'nullable|string',
            'metaDescription' => 'nullable|string',
            'isPublished' => 'boolean',
        ]);

        $page->update($validated);

        return response()->json($page->load('sections'));
    }

    public function destroy($id)
    {
        $page = ProductPage::findOrFail($id);
        $page->delete();

        return response()->json(['message' => 'Product page deleted']);
    }

    public function addSection(Request $request, $pageId)
    {
        $page = ProductPage::findOrFail($pageId);

        $validated = $request->validate([
            'type' => 'required|string',
            'order' => 'integer',
            'isActive' => 'boolean',
            'data' => 'required|string',
        ]);

        $section = $page->sections()->create($validated);

        return response()->json($section, 201);
    }

    public function updateSection(Request $request, $sectionId)
    {
        $section = ProductPageSection::findOrFail($sectionId);

        $validated = $request->validate([
            'type' => 'sometimes|string',
            'order' => 'sometimes|integer',
            'isActive' => 'sometimes|boolean',
            'data' => 'sometimes|string',
        ]);

        $section->update($validated);

        return response()->json($section);
    }

    public function deleteSection($sectionId)
    {
        $section = ProductPageSection::findOrFail($sectionId);
        $section->delete();

        return response()->json(['message' => 'Section deleted']);
    }

    public function reorderSections(Request $request, $pageId)
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|integer',
            'sections.*.order' => 'required|integer',
        ]);

        foreach ($request->sections as $sec) {
            ProductPageSection::where('id', $sec['id'])
                ->where('product_page_id', $pageId)
                ->update(['order' => $sec['order']]);
        }

        return response()->json(['message' => 'Sections reordered']);
    }
}
