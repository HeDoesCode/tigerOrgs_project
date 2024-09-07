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
        Schema::create('organization_photos', function (Blueprint $table) {
            $table->id('photoID');
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->string('caption');
            $table->string('filename');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_photos');
    }
};
