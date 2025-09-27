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
        Schema::create('tunneling_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('service_name');
            $table->enum('tunnel_type', ['pptp', 'l2tp', 'sstp', 'ovpn', 'wireguard']);
            $table->string('local_ip');
            $table->integer('local_port');
            $table->string('remote_ip');
            $table->integer('remote_port');
            $table->enum('protocol', ['tcp', 'udp', 'both'])->default('tcp');
            $table->enum('status', ['active', 'inactive', 'suspended', 'expired'])->default('inactive');
            $table->json('mikrotik_config')->nullable();
            $table->string('bandwidth_limit')->nullable();
            $table->datetime('expiry_date');
            $table->boolean('auto_renew')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tunneling_services');
    }
};