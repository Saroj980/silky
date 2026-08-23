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
            'type' => $type,
            'order' => $newOrder,
            'data' => $data ?? '{}',
            'isActive' => true,
        ]);

        return response()->json($section, 201);
    }

    public function update(Request $request, $id)
    {
        $section = PageSection::findOrFail($id);

        if ($request->has('data')) {
            $data = $request->input('data');
            $section->data = is_array($data) ? json_encode($data) : $data;
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
        $section = PageSection::findOrFail($id);
        $section->delete();
        return response()->json(['success' => true]);
    }
}
