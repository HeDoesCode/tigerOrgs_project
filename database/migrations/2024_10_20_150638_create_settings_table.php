<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('status');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
        });

        DB::table('settings')->insert([
            'name' => 'Recruitment',  
            'status' => false,  
            'start_date' => now(),           
            'end_date' => now(),           
        ]);

        DB::table('settings')->insert([
            'name' => 'Manual Registration',  
            'status' => false,  
            'start_date' => now(),           
            'end_date' => now(),          
        ]);

        DB::table('settings')->insert([
            'name' => 'Automation',  
            'status' => true,            
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
