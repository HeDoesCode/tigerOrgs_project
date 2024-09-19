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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id('orgID');
            $table->boolean('recruiting')->default(false);
            $table->string('name');
            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->string('description')->nullable();
            $table->string('fb_link')->nullable();
            $table->boolean('visibility')->default(1);
            $table->string('department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
