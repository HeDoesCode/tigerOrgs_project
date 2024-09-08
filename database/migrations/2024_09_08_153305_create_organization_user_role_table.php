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
        Schema::create('organization_user_role', function (Blueprint $table) {
            $table->string('userID');
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->foreign('userID')->references('userID')->on('users')->onDelete('cascade');
            $table->foreignId('roleID')->constrained('roles', 'roleID')->onDelete('cascade');
            $table->primary(['orgID', 'userID', 'roleID']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_user_role');
    }
};
