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
        Schema::create('forms', function (Blueprint $table) {
            $table->id('formID');
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->boolean('deployed')->default(false);
            $table->json('formLayout');
            $table->json('validationRules');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
