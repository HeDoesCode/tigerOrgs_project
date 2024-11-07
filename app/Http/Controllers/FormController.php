<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Criteria;
use Exception;
use App\Models\Form;
use Illuminate\Http\RedirectResponse;
use App\Models\Organization;
use App\Models\User;
use App\Notifications\AcceptedApplicationNotification;
use App\Notifications\PendingApplicationNotification;
use App\Notifications\RejectedApplicationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Smalot\PdfParser\Parser;
use Illuminate\Support\Str;

class FormController extends Controller
{
    // strictly for admin
    public function showBuilder($orgID)
    {
        $organizations = Organization::with('criteria')->find($orgID);

        return Inertia::render('Admin/AdminFormBuilder', [
            'orgID' => $organizations->orgID,
            'criterias'=> $organizations->criteria
        ]);
    }

    public function showBuilderEdit($orgID, $formID)
    {
        $organizations = Organization::with('criteria')->find($orgID);

        $form = Form::find($formID);

        return Inertia::render('Admin/AdminFormBuilder', [
            'orgID' => $organizations->orgID,
            'formData' => $form,
            'criterias'=> $organizations->criteria
        ]);
    }

    public function saveForm(Request $request, $orgID)
    {   

        try {
            $formLayout = $request->getContent();
            $validationRules = $this->buildRules(json_decode($formLayout, true)['layout']);

            $criteria = $request->input('criteria'); 

            $criteriaID = $criteria ? Criteria::where('criteriaID', $criteria)->value('criteriaID') : null;

            

            Form::create([
                'orgID' => $orgID,
                'criteriaID' => $criteriaID,
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

            $criteria = $request->input('criteria'); 

            $criteriaID = $criteria ? Criteria::where('criteriaID', $criteria)->value('criteriaID') : null;

            $form->update([
                'criteriaID' => $criteriaID,
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
        return strtolower(trim(str_replace(" ", "_", $text)));
    }

    private function buildRules($formLayout)
    {
        $rules = [];
        
        foreach ($formLayout as $input) {
            $inputRules = [];
            $fieldName = $this->prepareText($input['name']);

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
                    if ($input['required']) {
                        $inputRules = ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:5120']; // 5MB limit
                    } else {
                        $inputRules = ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:5120'];
                    }
                    break;
                case "file_upload":
                    if ($input['required']) {
                        $inputRules = ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'];
                    } else {
                        $inputRules = ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'];
                    }
                    break;
                case "checkbox":
                    array_push($inputRules, 'array');
                    if (!empty($input['options'])) {
                        array_push($inputRules, 'in:' . implode(',', array_map(fn($opt) => $this->prepareText($opt), $input['options'])));
                    }
                    break;
                case "radio":
                case "select":
                    if (!empty($input['options'])) {
                        array_push($inputRules, 'in:' . implode(',', array_map(fn($opt) => $this->prepareText($opt), $input['options'])));
                    }
                    break;
            }
            
            $rules[$fieldName] = implode('|', $inputRules);
        }

        return $rules;
    }

    public function submitForm(Request $request)
{
    try {
        $user = Auth::user();
        
        $validated = $request->validate([
            'orgID' => 'required',
            'formID' => 'required',
            'userData' => 'required|array',
            'formLayout' => 'required|array'
        ]);

        $formLayout = $validated['formLayout'];
        $userData = $validated['userData'];

        $fieldRules = $this->buildRules($formLayout['layout']);
        $validatedFields = $request->validate($fieldRules);

        foreach ($formLayout['layout'] as &$item) {
            $fieldName = $this->prepareText($item['name']);
            
            if (isset($userData[$fieldName])) {
                if (in_array($item['type'], ['file_upload', 'image_upload'])) {
                    if ($userData[$fieldName] instanceof \Illuminate\Http\UploadedFile) {
                        $file = $userData[$fieldName];
                        
                        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                        
                        $path = $file->storeAs(
                            'form-uploads/' . $validated['formID'],
                            $filename,
                            'public'
                        );

                        $item['value'] = [
                            'original_filename' => $file->getClientOriginalName(),
                            'stored_filename' => $filename,
                            'mime_type' => $file->getClientMimeType(),
                            'file_size' => $file->getSize(),
                            'file_path' => $path,
                            'uploaded_at' => now()->toDateTimeString()
                        ];

                        if ($file->getClientMimeType() === 'application/pdf') {
                            try {
                                $parser = new Parser();
                                $pdf = $parser->parseFile($file->getRealPath());
                                $item['value']['extracted_text'] = $pdf->getText();
                            } catch (\Exception $e) {
                                \Log::warning('PDF text extraction failed: ' . $e->getMessage());
                            }
                        }
                    }
                } else {
                    // for non-file fields, directly assign the value from userData
                    $item['value'] = $userData[$fieldName];
                }
            }
        }

        // Store form submission
        DB::table('applications')->insert([
            'userID' => $user->userID,
            'orgID' => $validated['orgID'],
            'formID' => $validated['formID'],
            'userData' => json_encode($formLayout),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        session()->flash('toast', [
            'title' => 'Application Submitted',
            'description' => 'Your application has been recorded. Please wait for the admin to process it.',
            'variant' => 'success'
        ]);

        return redirect()->route('organizations.home', ['orgID' => $validated['orgID']]);
        
    } catch (\Exception $e) {
        session()->flash('toast', [
            'title' => 'Error Processing Form',
            'description' => $e->getMessage(),
            'variant' => 'destructive'
        ]);
        return redirect()->back();
    }
}

        public function checkMembership(Request $request)
        {
            $exists = DB::table('organization_user_role')
                ->where('userID', $request->userID)
                ->where('orgID', $request->orgID)
                ->exists();

            return response()->json(['exists' => $exists]);
        }

        public function setStatus(Request $request, $orgID){
            try {
                $validated = $request->validate([
                    'applicationID' => 'required|exists:applications,applicationID',
                    'formID' => 'required|exists:forms,formID',
                    'userID' => 'required|exists:users,userID',
                    'orgID' => 'required|exists:organizations,orgID',
                    'status' => 'required',
                    'message' => 'nullable|string' 
                ]);
        
                $application = Application::where('applicationID', $validated['applicationID'])
                    ->where('formID', $validated['formID'])
                    ->where('userID', $validated['userID'])
                    ->first();

                //params that will be used for sending notif
                $user = User::find($validated['userID']);
                $org = Organization::find($validated['orgID']);
        
                if (!$application) {
                    session()->flash('toast', [
                        'title' => 'Application not found',
                        'description' => 'Please try again.',
                        'variant' => 'destructive'
                    ]);
                    return redirect()->back();
                }
        
                if (in_array($validated['status'], ['accepted', 'rejected'])) {
                    $this->deleteApplicationFiles($application);

                    $application->status = $validated['status'];
                    $application->save();

                    //put here the logic when the user is accepted, it will be a member of the org
                    //should be added in the organization user role

                    

                    if($validated['status'] === "accepted"){
                        try{
                            $exists = DB::table('organization_user_role')
                        ->where('userID', $validated['userID'])
                        ->where('orgID', $validated['orgID'])
                        ->exists();

                        if(!$exists){
                            DB::table('organization_user_role')->insert(
                                [
                                    'userID' => $validated['userID'],
                                    'orgID' => $validated['orgID'],
                                    'roleID' => 1.
                                ],
                                [
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]
                            );
                
                            session()->flash('toast', [
                                'title' => 'Status updated successfully',
                                'description' => 'The applicatant has been accepted and added to the members list.',
                                'variant' => 'success'
                            ]);
    
                            $user->notify(new AcceptedApplicationNotification($org, $validated['message']));

                            
                        }else{

                            session()->flash('toast', [
                                'title' => 'The user is already inside the organization',
                                'variant' => 'destructive'
                            ]);

                            return redirect()->back();
                            
                        }

                        }catch (Exception $e) {
                            session()->flash('toast', [
                                'title' => 'Error on status Accepted',
                                'description' => 'Please try again.',
                                'variant' => 'destructive'
                            ]);
                            return redirect()->back();
                        }

                    
                    }

                    if($validated['status'] === "rejected"){
                        $user->notify(new RejectedApplicationNotification($org, $validated['message']));
            
                        session()->flash('toast', [
                            'title' => 'Status updated successfully',
                            'description' => 'The applicationt has been rejected.',
                            'variant' => 'success'
                        ]);
                    }
        
                    return redirect()->back();
                }
        
                if ($validated['status'] === "pending") {
                    if (!empty($request->message)) {
                        $application->status = $validated['status'];
                        $application->additionalInstructions = $request->message;
                        $application->save();
        
                        session()->flash('toast', [
                            'title' => 'Status updated successfully',
                            'description' => 'The application status has been updated with additional instructions.',
                            'variant' => 'success'
                        ]);

                        $user->notify(new PendingApplicationNotification($org, $validated['message']));
                        
        
                        return redirect()->back();
                    } else {
                        session()->flash('toast', [
                            'title' => 'Additional Instruction or Message Required',
                            'description' => 'Please provide additional instructions.',
                            'variant' => 'destructive'
                        ]);
        
                        return redirect()->back();
                    }
                }
        
                session()->flash('toast', [
                    'title' => 'Invalid Status',
                    'description' => 'The status provided is invalid.',
                    'variant' => 'destructive'
                ]);
                
                return redirect()->back();
                
            } catch (Exception $e) {
                session()->flash('toast', [
                    'title' => 'Error',
                    'description' => 'An unexpected error occurred. Please try again.',
                    'variant' => 'destructive'
                ]);
                return redirect()->back();
            }
        }
        

        private function deleteApplicationFiles($application) {
            try {
                $formData = json_decode($application->formData, true);
                
                if (!$formData || !isset($formData['layout'])) {
                    return;
                }
        
                foreach ($formData['layout'] as $item) {
                    if (
                        in_array($item['type'], ['file_upload', 'image_upload']) && 
                        isset($item['value']) &&
                        isset($item['value']['file_path'])
                    ) {
                        // Delete the file from storage
                        if (Storage::disk('public')->exists($item['value']['file_path'])) {
                            Storage::disk('public')->delete($item['value']['file_path']);
                        }
                    }
                }
            } catch (Exception $e) {
                \Log::error('Error deleting application files: ' . $e->getMessage());
                // Continue execution even if file deletion fails
            }
        }
        


}
