<?php

namespace App\Http\Controllers;

use App\Jobs\DataExtraction as JobsDataExtraction;
use App\Models\DataExtraction;
use App\Models\DataExtractionTools;
use App\Models\Form;
use App\Models\Organization;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackendTestingController extends Controller
{

    public $user;
    public $org;

    public function __construct()
    {
        $this->user = User::find('2024000003');
        $this->org = Organization::find(1);
    }


    public function run() {
        
        // dd($user);

        // $user->roles()->attach(3);
        // $user->roles()->attach(2);

        // Organization::create([
        //     'name' => 'SITE',
        //     'department' => 'CICS',
        // ]);
        
        // $user->follows()->attach(1);

        // Photo::create([
        //     'orgID' => $org->orgID,
        //     'filename' => 'logo.png', 
        // ]);

        // Form::create([
        //     'orgID' => $org->orgID,
        //     'formLayout' => '[{id: 1, title: "task 1"},]',
        // ]);

        
        // foreach ($org->forms as $form) {
        //     echo $form->formLayout;
        // }


        return Inertia::render('TestingPages/NLP');
    }

    public function submit(Request $request)
    {
        if ($request->hasFile('resume')) {
            $file = DataExtractionTools::parseFile($request->file('resume'));

            JobsDataExtraction::dispatch($file);
        }
    }

    public function renderForm() {
        $formLayout = json_decode($this->org->forms[0]->formLayout);

        return Inertia::render("TestingPages/Forms", ['formLayout' =>  $formLayout]);
    }

    public function showBuilder() {
        return Inertia::render("TestingPages/FormBuilding");
    }
}
