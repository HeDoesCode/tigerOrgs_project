<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Form;
use Illuminate\Http\RedirectResponse;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FormController extends Controller
{
    // strictly for admin
    public function showBuilder($orgID)
    {
        $organizations = Organization::find($orgID);

        return Inertia::render('Admin/AdminFormBuilder', [
            'orgID' => $organizations->orgID,
        ]);
    }

    public function showBuilderEdit($orgID, $formID)
    {
        $organizations = Organization::find($orgID);

        $form = Form::find($formID);

        return Inertia::render('Admin/AdminFormBuilder', [
            'orgID' => $organizations->orgID,
            'formData' => $form,
        ]);
    }

    public function saveForm(Request $request, $orgID)
    {   
        try {
            $formLayout = $request->getContent();
            $validationRules = $this->buildRules(json_decode($formLayout, true)['layout']);

            Form::create([
                'orgID' => $orgID,
                'formLayout' => json_decode($formLayout),
                'validationRules' => $validationRules,
            ]);
                        

            session()->flash('toast', [
                'title' => 'Form Saved',
                'description' => 'The form has been successfully saved.',
                'duration' => 5000,
                'variant' => 'success'
            ]);
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Form Save Error',
                'description' => 'There was an error saving the form. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
            return redirect()->back();
        }

        return redirect(route('admin.forms', $orgID));
    }

    public function editForm(Request $request, $orgID, $formID)
    {
        $form = Form::findOrFail($formID);
        
        try {

            $updatedFormLayout = $request->getContent();
            $updatedValidationRules = $this->buildRules(json_decode($updatedFormLayout, true)['layout']);

            $form->update([
                'formLayout' => json_decode($updatedFormLayout),
                'validationRules' => $updatedValidationRules,
            ]);

            session()->flash('toast', [
                'title' => 'Form Updated',
                'description' => 'The form has been successfully updated.',
                'duration' => 5000,
                'variant' => 'success'
            ]);
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Form Update Error',
                'description' => 'There was an error updating the form. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
            return redirect()->back();
        }
        return redirect(route('admin.forms', $orgID));
    }

    public function deleteForm(Request $request, $orgID, $formID)
    {
        $form = Form::findOrFail($formID);
        try {
            $form->delete();

            session()->flash('toast', [
                'title' => 'Form Deleted',
                'description' => 'The form has been successfully deleted.',
                'duration' => 5000,
                'variant' => 'success'
            ]);
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Form Delete Error',
                'description' => 'There was an error deleting the form. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
            return redirect()->back();
        }
        return redirect(route('admin.forms', $orgID));
    }

    public function setFormDeploy($orgID, $formID, $deploy)
    {
        $deploy = $deploy === "true" ? true : false;
        $form = Form::findOrFail($formID);

        try {
            $form->deployed = $deploy;
            $form->save();

            if ($deploy) {
                session()->flash('toast', [
                    'title' => 'Form Deployed Successfully',
                    'description' => "The form has been successfully deployed. Students may now view this form in your \"Home\" page",
                    'duration' => 5000,
                    'variant' => 'success'
                ]);
            } else {
                session()->flash('toast', [
                    'title' => 'Form Withdrawn Successfully',
                    'description' => "The form has been successfully withdrawn and is now inaccessible to users.",
                    'duration' => 5000,
                    'variant' => 'success'
                ]);
            }
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Form Deploy Error',
                'description' => 'There was an error deploying the form. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
        }
        return redirect()->back();
    }

    private function prepareText($text)
    {
        $text = strtolower($text);
        $text = trim($text);
        $text = str_replace(" ", "_", $text);
        return $text;
    }

    private function buildRules($formLayout)
    {
        $rules = [];
        
        foreach ($formLayout as $input) {
            $inputRules = [];

            if ($input['required']) {
                array_push($inputRules, 'required');
            } else {
                array_push($inputRules, 'nullable');
            }

            switch ($input['type']) {
                case "text":
                    array_push($inputRules, 'string');
                    break;
                case "number":
                    array_push($inputRules, 'numeric');
                    break;
                case "email":
                    array_push($inputRules, 'email');
                    break;
                case "image_upload":
                    array_push($inputRules, 'file', 'max:4096', 'image', 'mimes:png,jpg,jpeg');
                    break;
                case "file_upload":
                    array_push($inputRules, 'file', 'max:4096', 'extensions:pdf');
                    break;
            }
            $fieldName = $this->prepareText($input['name']);
            $rules[$fieldName] = $inputRules;
        }

        return $rules;
    }

        public function submitForm(Request $request)
        {

            try{

                $user = Auth::user();
                $validated = $request->validate([
                    'orgID'=>'required',
                    'formID' =>'required'
                ]);

                // $formLayout = $request->formLayout['layout'];

                // $rules = $this->buildRules($formLayout);

                // $request->validate($rules);

                if(!$validated){
                    session()->flash('toast', [
                        'title' => 'Error submitting the form',
                        'description' => 'Please double check your inputs in the form.',
                        'variant' => 'destructive'
                    ]);
                }

                DB::table('applications')->insert(
                    [
                        'userID'=> $user->userID,
                        'orgID'=> $validated['orgID'],
                        'formID'=> $validated['formID']

                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                    );

                    session()->flash('toast', [
                        'title' => 'Application Submitted',
                        'description' => 'Your application has been recorded. Please wait for the admin to process it.',
                        'variant' => 'success'
                    ]);

                    return redirect()->route('organizations.home', ['orgID' => $validated['orgID']]);
                
            }catch (Exception $e){
                return redirect()->back()->with('error');
            }
        }





}
