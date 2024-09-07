<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
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
}
