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
        Schema::create('hosting_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('billing_cycle'); // monthly, yearly
            $table->integer('storage_gb');
            $table->integer('bandwidth_gb');
            $table->integer('email_accounts');
            $table->integer('databases');
            $table->integer('domains');
            $table->boolean('ssl_certificate')->default(true);
            $table->boolean('backup_daily')->default(false);
            $table->boolean('support_24_7')->default(false);
            $table->json('features'); // Additional features as JSON
            $table->string('badge')->nullable(); // Popular, Best Value, etc.
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hosting_packages');
    }
};
