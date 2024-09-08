<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FormsController extends Controller
{   
    // strictly for admin
    public function showBuilder() {
        return Inertia::render('Admin/AdminFormBuilder');
    }
    
    public function saveForm(Request $request) {
        $formData = json_encode($request->json()->all());

        Form::create([
            'orgID' => 1,
            'formLayout' => $formData,
        ]);
    }

    private function prepareText($text) {
        $text = strtolower($text);
        $text = trim($text);
        $text = str_replace(" ", "_", $text);
        return $text;
    }

    private function buildRules($formLayout) {
        $rules = [];

        foreach ($formLayout as $input) {
            $inputRules = array();

            if ($input['required'] === "1") {
                array_push($inputRules, 'required');
            } else {
                array_push($inputRules, 'nullable');
            }

            switch ($input['type']) {
                case "number":
                    array_push($inputRules, 'numeric');
                    break;
                case "email":
                    break;
                    array_push($inputRules, 'email');
                case "image_upload":
                    array_push($inputRules, 'file', 'max:4096', 'image', 'mimes:png,jpg,jpeg');
                    break;
                case "file_upload":
                    array_push($inputRules, 'file', 'max:4096', 'extensions:pdf');
                    break;

            }
            $fieldName = "userData.".$this->prepareText($input['name']);
            $rules[$fieldName] = str_replace('_', '|',implode("_", $inputRules));
        }

        return $rules;
    }

    public function submitForm(Request $request)  {
        $formLayout = $request->formLayout;

        $rules = $this->buildRules($formLayout);
    
        $request->validate($rules);
        
        // do smth with data if properly validated
        // TO-DO

        // success gets redirected here
        return Inertia::render('Admin/AdminFormBuilder');
    }
}
