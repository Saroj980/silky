<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    public function index()
    {
        $sections = PageSection::orderBy('order', 'asc')->get();
        return response()->json($sections);
    }

    public function store(Request $request)
    {
        $type = $request->input('type');
        $data = $request->input('data');
        if (is_array($data)) {
            $data = json_encode($data);
        }

        $lastSection = PageSection::orderBy('order', 'desc')->first();
        $newOrder = $lastSection ? $lastSection->order + 1 : 1;

        $section = PageSection::create([
            'type'     => $type,
            'order'    => $newOrder,
            'data'     => $data ?? '{}',
            'isActive' => true,
        ]);

        return response()->json($section, 201);
    }

    /**
     * Update a page section.
     * Strategy (robust upsert):
     *  1. Try to find by the given $id.
     *  2. If not found by ID, look up by 'type' sent in the request body.
     *  3. If still not found, CREATE a new record (so first publish always works).
     */
    public function update(Request $request, $id)
    {
        // 1. Try find by primary key
        $section = PageSection::find($id);

        // 2. Fallback: find by type
        if (!$section && $request->has('type')) {
            $section = PageSection::where('type', $request->input('type'))->first();
        }

        // 3. Still nothing — create it fresh
        if (!$section) {
            $type = $request->input('type', 'CUSTOM');
            $lastSection = PageSection::orderBy('order', 'desc')->first();
            $newOrder    = $lastSection ? $lastSection->order + 1 : 1;

            $section = new PageSection();
            $section->type     = $type;
            $section->order    = $newOrder;
            $section->isActive = true;
            $section->data     = '{}';
        }

        if ($request->has('data')) {
            $data           = $request->input('data');
            $section->data  = is_array($data) ? json_encode($data) : $data;
        }

        if ($request->has('isActive')) {
            $section->isActive = (bool) $request->input('isActive');
        }

        if ($request->has('order')) {
            $section->order = (int) $request->input('order');
        }

        $section->save();
        return response()->json($section);
    }

    public function reorder(Request $request)
    {
        $sections = $request->input('sections', []);
        foreach ($sections as $s) {
            if (isset($s['id']) && isset($s['order'])) {
                PageSection::where('id', $s['id'])->update(['order' => $s['order']]);
            }
        }
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $section = PageSection::find($id);
        if ($section) {
            $section->delete();
        }
        return response()->json(['success' => true]);
    }
}
