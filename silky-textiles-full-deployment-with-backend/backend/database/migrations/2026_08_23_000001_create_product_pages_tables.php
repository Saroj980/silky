<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category');
            $table->string('heroImage');
            $table->string('metaTitle')->nullable();
            $table->text('metaDescription')->nullable();
            $table->boolean('isPublished')->default(true);
            $table->timestamps();
        });

        Schema::create('product_page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_page_id')->constrained('product_pages')->onDelete('cascade');
            $table->string('type');
            $table->integer('order')->default(0);
            $table->boolean('isActive')->default(true);
            $table->longText('data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_page_sections');
        Schema::dropIfExists('product_pages');
    }
};
