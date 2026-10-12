<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralPage extends Model
{
    use HasFactory;

    protected $table = 'general_pages';

    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'pageType',
        'status',
        'isActive',
        'featuredImage',
        'content',
        'seoTitle',
        'seoDescription',
        'seoKeywords',
        'ogImage',
        'allowIndexing',
        'author',
    ];

    protected $casts = [
        'isActive' => 'boolean',
        'allowIndexing' => 'boolean',
    ];
}
