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
        Schema::create('admin_invite_history', function (Blueprint $table) {
            $table->id('inviteID'); 
            $table->string('inviter_userID'); 
            $table->string('invited_userID'); 
            
            $table->foreign('inviter_userID')->references('userID')->on('users')->onDelete('cascade');
            $table->foreign('invited_userID')->references('userID')->on('users')->onDelete('cascade');
            $table->foreignId('orgID')->constrained('organizations', 'orgID')->onDelete('cascade');
            $table->timestamp('invite_timestamp')->useCurrent(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_invite_history');
    }
};
