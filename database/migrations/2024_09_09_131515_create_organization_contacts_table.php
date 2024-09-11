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
        Schema::create('organization_contacts', function (Blueprint $table) {
            $table->id('contactID')->primary;
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->string('platform');
            $table->string('name')->nullable();
            $table->string('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_contacts');
    }
};
