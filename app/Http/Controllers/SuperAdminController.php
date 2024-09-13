<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Organization;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SuperAdminController extends Controller
{
    //manage org functions
    public function manage(){
        
        $organizations = Organization::withCount('members')->get();

        return Inertia::render('SuperAdmin/SuperAdminManage',[
            'organizations'=> $organizations,
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

    public function invite()
{
    $admins = User::join('organization_user_role', 'users.userID', '=', 'organization_user_role.userID')
         
        ->where('organization_user_role.roleID', 2) 
        ->select('users.userID', 'users.email', 'users.firstname', 'users.lastname', 'users.college', 'users.status')
        ->distinct()
        ->withCount('organizations')
        ->get();



        $userRoles = DB::table('organization_user_role')
        ->join('roles', 'organization_user_role.roleID', '=', 'roles.roleID')
        ->join('organizations', 'organization_user_role.orgID', '=', 'organizations.orgID')
        ->get();

    

    return Inertia::render('SuperAdmin/SuperAdminInvite', [
        'users' => $admins,
        'userRoles' => $userRoles,
        'organizations' => Organization::all()
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


    public function addAdmin(Request $request){
        $validated = $request->validate([
            'userID' => 'required|exists:users,userID',
            'orgID' => 'required|exists:organizations,orgID',
            'roleID' => 'required|exists:roles,roleID',
        ]);



        try {
            DB::table('organization_user_role')->updateOrInsert(
                [
                    'userID' => $validated['userID'],
                    'orgID' => $validated['orgID'],
                ],
                [
                    'roleID' => $validated['roleID'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            session()->flash('toast', [
                'title' => 'Saved',
                'description' => 'User Assigned as Admin.',
                'variant' => 'success'
            ]);
    
            return to_route('superadmin.invite');

        }catch(Exception $e){

            return redirect()->back()->with('error', 'An error occurred while assigning the admin role.');

        }

       

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
