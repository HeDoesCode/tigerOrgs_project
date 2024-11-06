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
        Schema::create('users', function (Blueprint $table) {
            $table->string('userID')->unique()->primary();
            $table->string('email')->unique();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('middlename')->nullable();
            $table->string('section')->nullable();
            $table->string('remember_token', 100)->nullable();
            $table->string('status');
            $table->string('college');
        });

        DB::table('users')->insert([
            [
                'userID' => '2024000001',
                'email' => 'arvin.alkuino.cics@ust.edu.ph',
                'firstname' => 'ARVIN',
                'lastname' => 'ALKUINO',
                'middlename' => 'GUTIERREZ',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000002',
                'email' => 'laurencearvin.arcilla.cics@ust.edu.ph',
                'firstname' => 'LAURENCE ARVIN',
                'lastname' => 'ARCILLA',
                'middlename' => 'MIDDLENAME',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000003',
                'email' => 'ethanjohn.catacutan.cics@ust.edu.ph',
                'firstname' => 'ETHAN JOHN',
                'lastname' => 'CATACUTAN',
                'middlename' => 'MIDDLENAME',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ],
            [
                'userID' => '2024000004',
                'email' => 'josephvictor.paduga.cics@ust.edu.ph',
                'firstname' => 'JOSEPH VICTOR',
                'lastname' => 'PADUGA',
                'middlename' => 'CICS',
                'college' => 'College of Information and Computing Sciences',
                'status' => 'student',
            ]
        ]);

        // might not need anymore since we use google api to login
        // Schema::create('password_reset_tokens', function (Blueprint $table) {
        //     $table->string('email')->primary();
        //     $table->string('token');
        //     $table->timestamp('created_at')->nullable();
        // });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        // Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
