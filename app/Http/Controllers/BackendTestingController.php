<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Organization;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;

class BackendTestingController extends Controller
{
    public function run() {
        $user = User::find('2024000003');
        // dd($user);

        // $user->roles()->attach(3);
        // $user->roles()->attach(2);

        // Organization::create([
        //     'name' => 'SITE',
        //     'department' => 'CICS',
        // ]);

        $org = Organization::find(1);
        
        // $user->follows()->attach(1);

        // Photo::create([
        //     'orgID' => $org->orgID,
        //     'filename' => 'logo.png', 
        // ]);

        Form::create([
            'orgID' => $org->orgID,
            'formLayout' => '[{id: 1, title: "task 1"},]',
        ]);

        
        foreach ($org->forms as $form) {
            echo $form->formLayout;
        }
    }
}
