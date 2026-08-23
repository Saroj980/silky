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
        Schema::create('site_configs', function (Blueprint $table) {
            $table->id();
            $table->string('logoUrl')->nullable();
            $table->string('logoAlt')->nullable();
            $table->text('topBarText')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp')->nullable();
            $table->text('navLinks')->nullable();
            $table->string('primaryColor')->default('#DE7B3D');
            $table->string('bgColor')->default('#F7F5F2');
            $table->string('textColor')->default('#1F2A37');
            $table->string('headingFont')->default('inter');
            $table->string('bodyFont')->default('inter');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_configs');
    }
};
