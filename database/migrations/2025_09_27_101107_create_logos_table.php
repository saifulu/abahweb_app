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
        Schema::create('logos', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Logo name/title
            $table->string('type'); // main, secondary, favicon, etc.
            $table->string('file_path'); // Path to the logo file
            $table->string('file_name'); // Original file name
            $table->string('file_size')->nullable(); // File size in bytes
            $table->string('mime_type')->nullable(); // MIME type
            $table->integer('width')->nullable(); // Image width
            $table->integer('height')->nullable(); // Image height
            $table->text('description')->nullable(); // Logo description
            $table->boolean('is_active')->default(true); // Active status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logos');
    }
};
