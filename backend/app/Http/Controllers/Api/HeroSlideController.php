<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::orderBy('id', 'asc')->get();
        return response()->json($slides);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['trustBadges']) && is_array($data['trustBadges'])) {
            $data['trustBadges'] = json_encode($data['trustBadges']);
        }

        $allowedColumns = Schema::getColumnListing('hero_slides');
        $filteredData = array_intersect_key($data, array_flip($allowedColumns));

        $slideData = array_merge([
            'tagline' => 'New Tagline',
            'title' => 'New Slide Title',
            'description' => 'Description for your new slide goes here.',
            'primaryBtnText' => 'Get Started',
            'primaryBtnHref' => '#',
            'secondaryBtnText' => 'Learn More',
            'secondaryBtnHref' => '#',
            'image' => '/homepage-image/Homepage (9).jpg',
            'imageAlt' => 'New slide image',
            'badgeText' => 'Premium Quality',
            'trustBadges' => json_encode(['Fast Delivery', 'High Quality']),
            'textColor' => '#1F2A37',
            'textAlignment' => 'Left',
            'overlayEnabled' => 'true',
            'overlayOpacity' => '60',
            'status' => 'Active',
        ], $filteredData);

        $slide = HeroSlide::create($slideData);

        return response()->json($slide, 201);
    }

    public function show($id)
    {
        $slide = HeroSlide::findOrFail($id);
        return response()->json($slide);
    }

    public function update(Request $request, $id)
    {
        $slide = HeroSlide::findOrFail($id);
        $data = $request->all();

        if (isset($data['trustBadges']) && is_array($data['trustBadges'])) {
            $data['trustBadges'] = json_encode($data['trustBadges']);
        }

        // Filter only columns that exist in the hero_slides table
        $allowedColumns = Schema::getColumnListing('hero_slides');
        $filteredData = array_intersect_key($data, array_flip($allowedColumns));

        $slide->update($filteredData);
        return response()->json($slide);
    }

    public function destroy($id)
    {
        $slide = HeroSlide::findOrFail($id);
        $slide->delete();
        return response()->json(['success' => true]);
    }
}
