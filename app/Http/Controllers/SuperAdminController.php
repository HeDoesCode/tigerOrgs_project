<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SuperAdminController extends Controller
{
    //manage org functions
    public function manage(){

        return Inertia::render('SuperAdmin/SuperAdminManage',[
            'organizations'=> Organization::all(),
        ]);
    }

    public function updateOrganizations(Request $request) {
        foreach ($request->organizations as $organization) {
            Log::info('Updating organization', [
                'id' => $organization['id'], 
                'visibility' => $organization['visibility']
            ]);
    
            $updated = Organization::where('orgID', $organization['id'])
                ->update(['visibility' => $organization['visibility']]);
    
            Log::info('Update result', ['updated' => $updated]);
        }
    
        return redirect()->route('superadmin.status')->with('success', 'Organizations Updated Successfully.');
    }
        

    //invite admin functions

    public function invite(){
        $admins = User::whereHas('roles', function ($query){
            $query->where('role_description', 'admin');
        })->get();

        return Inertia::render('SuperAdmin/SuperAdminInvite', [
            'users' => $admins,
        ]);
    }

    public function search(Request $request){
        $query = $request->input('query');

        $users = User::where('firstname', 'LIKE', "%{$query}%")
        ->orWhere('lastname', 'LIKE', "%{$query}%")
        ->orWhere('email', 'LIKE', "%{$query}%")
        ->orWhere(DB::raw("CONCAT(firstname, ' ', lastname)"), 'LIKE', "%{$query}%")
        ->orWhere(DB::raw("CONCAT(lastname, ' ', firstname)"), 'LIKE', "%{$query}%")
        ->take(3)
        ->get();

        return response()->json($users);
    }
}
