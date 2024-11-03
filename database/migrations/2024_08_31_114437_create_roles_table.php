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
        Schema::create('roles', function (Blueprint $table) {
            $table->id('roleID');
            $table->string('role_description');
        });

        DB::table('roles')->insert([
            [
                'roleID' => 3,
                'role_description' => 'superadmin',
            ],
            [
                'roleID' => 2,
                'role_description' => 'admin'
            ],
            [
                'roleID' => 1,
                'role_description' => 'student'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
