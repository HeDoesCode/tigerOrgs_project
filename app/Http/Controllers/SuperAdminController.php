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
            Organization::where('orgID', $organization['id'])
                ->update(['visibility' => $organization['visibility']]);
        }
    
        return redirect()->route('superadmin.status');
    }

    public function searchOrg(Request $request){
        $query = $request->input('query');

        $orgs = Organization::where('name', 'LIKE', "%{$query}%")
        ->orWhere('department', 'LIKE', "%{$query}%")
        ->get();

        return response()->json($orgs);


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
