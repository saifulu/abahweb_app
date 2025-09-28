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
        Schema::create('landing_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section'); // hero, about, features, testimonials, etc.
            $table->string('type'); // h1, span, p, button, etc.
            $table->string('key')->unique(); // unique identifier for each content
            $table->string('title')->nullable(); // title for the content
            $table->text('content'); // main content
            $table->json('metadata')->nullable(); // additional data like button_url, icon, etc.
            $table->integer('order')->default(0); // for ordering content
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_page_contents');
    }
};
