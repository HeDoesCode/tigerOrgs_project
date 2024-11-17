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
        Schema::create('applications', function (Blueprint $table) {
            $table->id('applicationID');
            $table->string('userID');
            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->foreignId('formID')->constrained('forms', 'formID')->onDelete('cascade');
            //add criteria column na nullable?
            $table->json('userData')->nullable();//nullable muna for now
            $table->float('similarityScore')->nullable();//nullable muna for now
            $table->string('additionalInstructions')->nullable();
            $table->enum('status', ['submitted', 'accepted', 'pending', 'rejected'])->default('submitted');
            $table->json('prepared_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
