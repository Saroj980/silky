<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class CustomCodeController extends Controller
{
    private function getSnippetsContainer()
    {
        return PageSection::firstOrCreate(
            ['type' => 'CUSTOM_CODE_SNIPPETS'],
            [
                'order' => 999,
                'isActive' => true,
                'data' => json_encode([])
            ]
        );
    }

    private function getSnippetsList()
    {
        $container = $this->getSnippetsContainer();
        if (empty($container->data)) {
            return [];
        }
        $list = json_decode($container->data, true);
        return is_array($list) ? $list : [];
    }

    private function saveSnippetsList(array $snippets)
    {
        $container = $this->getSnippetsContainer();
        $container->data = json_encode(array_values($snippets));
        $container->save();
        return $snippets;
    }

    public function index(Request $request)
    {
        $snippets = $this->getSnippetsList();

        // If public requested only active snippets
        if ($request->query('active_only') === '1' || $request->query('active_only') === 'true') {
            $snippets = array_filter($snippets, function ($s) {
                return !isset($s['isActive']) || $s['isActive'] === true;
            });
        }

        return response()->json(array_values($snippets));
    }

    public function store(Request $request)
    {
        $snippets = $this->getSnippetsList();

        $newSnippet = [
            'id' => 'snip_' . time() . '_' . substr(md5(uniqid()), 0, 6),
            'title' => $request->input('title', 'Untitled Snippet'),
            'codeType' => $request->input('codeType', 'css'), // 'css' | 'js' | 'html'
            'code' => $request->input('code', ''),
            'placement' => $request->input('placement', 'head'), // 'head' | 'body_start' | 'footer'
            'targetDevice' => $request->input('targetDevice', 'all'), // 'all' | 'desktop' | 'mobile'
            'targetPage' => $request->input('targetPage', 'all'), // 'all' | '/' | '/products/*' | slug
            'targetSection' => $request->input('targetSection', ''), // '#uniforms', '#hero', etc.
            'isActive' => $request->boolean('isActive', true),
            'isFavorite' => $request->boolean('isFavorite', false),
            'createdAt' => now()->toIso8601String(),
            'updatedAt' => now()->toIso8601String(),
        ];

        array_unshift($snippets, $newSnippet);
        $this->saveSnippetsList($snippets);

        return response()->json([
            'message' => 'Snippet created successfully',
            'snippet' => $newSnippet
        ], 201);
    }

    public function show($id)
    {
        $snippets = $this->getSnippetsList();
        foreach ($snippets as $snippet) {
            if ($snippet['id'] === $id) {
                return response()->json($snippet);
            }
        }
        return response()->json(['message' => 'Snippet not found'], 404);
    }

    public function update(Request $request, $id)
    {
        $snippets = $this->getSnippetsList();
        $found = false;

        foreach ($snippets as &$snippet) {
            if ($snippet['id'] === $id) {
                $snippet['title'] = $request->input('title', $snippet['title']);
                $snippet['codeType'] = $request->input('codeType', $snippet['codeType']);
                $snippet['code'] = $request->input('code', $snippet['code']);
                $snippet['placement'] = $request->input('placement', $snippet['placement']);
                $snippet['targetDevice'] = $request->input('targetDevice', $snippet['targetDevice']);
                $snippet['targetPage'] = $request->input('targetPage', $snippet['targetPage'] ?? 'all');
                $snippet['targetSection'] = $request->input('targetSection', $snippet['targetSection'] ?? '');
                if ($request->has('isActive')) {
                    $snippet['isActive'] = $request->boolean('isActive');
                }
                if ($request->has('isFavorite')) {
                    $snippet['isFavorite'] = $request->boolean('isFavorite');
                }
                $snippet['updatedAt'] = now()->toIso8601String();
                $found = true;
                break;
            }
        }

        if (!$found) {
            return response()->json(['message' => 'Snippet not found'], 404);
        }

        $this->saveSnippetsList($snippets);

        return response()->json(['message' => 'Snippet updated successfully']);
    }

    public function toggle($id)
    {
        $snippets = $this->getSnippetsList();
        $found = false;
        $newStatus = true;

        foreach ($snippets as &$snippet) {
            if ($snippet['id'] === $id) {
                $snippet['isActive'] = !($snippet['isActive'] ?? true);
                $snippet['updatedAt'] = now()->toIso8601String();
                $newStatus = $snippet['isActive'];
                $found = true;
                break;
            }
        }

        if (!$found) {
            return response()->json(['message' => 'Snippet not found'], 404);
        }

        $this->saveSnippetsList($snippets);

        return response()->json([
            'message' => 'Snippet status toggled',
            'isActive' => $newStatus
        ]);
    }

    public function destroy($id)
    {
        $snippets = $this->getSnippetsList();
        $originalCount = count($snippets);

        $snippets = array_filter($snippets, function ($s) use ($id) {
            return $s['id'] !== $id;
        });

        if (count($snippets) === $originalCount) {
            return response()->json(['message' => 'Snippet not found'], 404);
        }

        $this->saveSnippetsList($snippets);

        return response()->json(['message' => 'Snippet deleted successfully']);
    }

    public function saveAll(Request $request)
    {
        $snippets = $request->input('snippets', []);
        if (is_array($snippets)) {
            $this->saveSnippetsList($snippets);
            return response()->json(['message' => 'All snippets updated']);
        }
        return response()->json(['message' => 'Invalid data format'], 422);
    }
}
