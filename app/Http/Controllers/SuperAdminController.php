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
            'departments' => Organization::distinct()->pluck('department')
        ]);
    }

    public function updateOrganizations(Request $request) {
        foreach ($request->organizations as $organization) {
            Organization::where('orgID', $organization['id'])
                ->update(['visibility' => $organization['visibility']]);
        }

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'Organization Updated Successfully!',
            'variant' => 'success'
        ]);
    
        return redirect()->route('superadmin.status');
    }

    public function searchOrg(Request $request){
        $query = Organization::query();
        
        if($request->filled('query')){
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', "%" . $request->input('query') . "%")
                  ->orWhere('department', 'LIKE', "%" . $request->input('query') . "%");
            });
        }
    
        if($request->filled('category') && $request->input('category') !== 'All'){
            $query->where('department', $request->input('category'));
        }
    
        $orgs = $query->get();
        $departments = Organization::distinct()->pluck('department');
    
        return response()->json([
            'organizations' => $orgs,
            'departments' => $departments
        ]);
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


    //file upload functions

    public function fileupload(){
        return Inertia::render('SuperAdmin/SuperAdminDataUpload');
    }

    public function upload(Request $request){

        //ethan john catacutan send help
        dd($request->all());

    }
}
