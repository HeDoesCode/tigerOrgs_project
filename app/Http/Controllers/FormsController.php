<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Form;
use Inertia\Inertia;
use App\Models\Organization;
use Illuminate\Http\Request;

class FormsController extends Controller
{
    // strictly for admin
    public function showBuilder($orgID)
    {
        $organizations = Organization::find($orgID);

        return Inertia::render('Admin/AdminFormBuilder', [
            'orgID' => $organizations->orgID,
        ]);
    }

    public function saveForm(Request $request, $orgID)
    {
        try {
            $formData = json_encode($request->json()->all());

            Form::create([
                'orgID' => $orgID,
                'formLayout' => $formData,
            ]);

            session()->flash('toast', [
                'title' => 'Form Saved',
                'description' => 'The form has been successfully saved.',
                'duration' => 5000,
                'variant' => 'success'
            ]);
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Save Error',
                'description' => 'There was an error saving the form. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
        }

        return redirect(route('admin.forms', $orgID));
    }
}
