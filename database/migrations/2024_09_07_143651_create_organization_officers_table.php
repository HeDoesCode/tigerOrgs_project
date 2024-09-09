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
        Schema::create('organization_officers', function (Blueprint $table) {
            $table->id('officerID')->primary();
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->string('userID');
            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
            $table->string('position');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_officers');
    }
};
