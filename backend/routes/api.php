<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\SiteConfigController;
use App\Http\Controllers\Api\PageSectionController;
use App\Http\Controllers\Api\ProductPageController;
use App\Http\Controllers\Api\UploadController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Hero Slides
Route::get('/hero-slides', [HeroSlideController::class, 'index']);
Route::post('/hero-slides', [HeroSlideController::class, 'store']);
Route::get('/hero-slides/{id}', [HeroSlideController::class, 'show']);
Route::put('/hero-slides/{id}', [HeroSlideController::class, 'update']);
Route::delete('/hero-slides/{id}', [HeroSlideController::class, 'destroy']);

// Site Config
Route::get('/site-config', [SiteConfigController::class, 'show']);
Route::put('/site-config', [SiteConfigController::class, 'update']);
Route::post('/site-config', [SiteConfigController::class, 'update']);

// Page Sections
Route::get('/page-sections', [PageSectionController::class, 'index']);
Route::post('/page-sections', [PageSectionController::class, 'store']);
Route::post('/page-sections/reorder', [PageSectionController::class, 'reorder']);
Route::put('/page-sections/{id}', [PageSectionController::class, 'update']);
Route::delete('/page-sections/{id}', [PageSectionController::class, 'destroy']);

// Product Pages (MySQL)
Route::get('/product-pages', [ProductPageController::class, 'index']);
Route::post('/product-pages', [ProductPageController::class, 'store']);
Route::get('/product-pages/slug/{slug}', [ProductPageController::class, 'showBySlug']);
Route::put('/product-pages/{id}', [ProductPageController::class, 'update']);
Route::delete('/product-pages/{id}', [ProductPageController::class, 'destroy']);
Route::post('/product-pages/{id}/sections', [ProductPageController::class, 'addSection']);
Route::post('/product-pages/{id}/save-sections', [ProductPageController::class, 'saveSections']);
Route::put('/product-pages/sections/{sectionId}', [ProductPageController::class, 'updateSection']);
Route::delete('/product-pages/sections/{sectionId}', [ProductPageController::class, 'deleteSection']);
Route::post('/product-pages/{id}/reorder', [ProductPageController::class, 'reorderSections']);

// Upload
Route::post('/upload', [UploadController::class, 'store']);
