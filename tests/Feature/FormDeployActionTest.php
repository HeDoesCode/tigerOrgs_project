<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormDeployActionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_sets_form_deploy_to_true(): void
    {
        $user = User::find('2024000004');

        $this->actingAs($user)
            ->patch('admin/10016/forms/1/deploy/true')
            ->assertStatus(200)
            ->assertJson(['message' => 'Form deployment updated successfully']);

        $this->assertDatabaseHas('forms', [
            'id' => 1,
            'deploy' => true,
        ]);
    }
}
