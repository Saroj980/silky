<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('tagline')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('primaryBtnText')->nullable();
            $table->string('primaryBtnHref')->nullable();
            $table->string('secondaryBtnText')->nullable();
            $table->string('secondaryBtnHref')->nullable();
            $table->string('image')->nullable();
            $table->string('imageAlt')->nullable();
            $table->string('badgeText')->nullable();
            $table->text('trustBadges')->nullable();
            $table->string('textColor')->nullable()->default('#1F2A37');
            $table->string('textAlignment')->nullable()->default('Left');
            $table->string('overlayEnabled')->nullable()->default('true');
            $table->string('overlayOpacity')->nullable()->default('60');
            $table->string('status')->nullable()->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
