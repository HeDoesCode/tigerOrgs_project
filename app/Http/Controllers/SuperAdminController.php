<?php

namespace App\Http\Controllers;

use PDO;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Organization;
use App\Notifications\MakeAdminNotification;
use App\Notifications\RemoveAdminNotification;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\PostDec;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use function Laravel\Prompts\error;

class SuperAdminController extends Controller
{
    //manage org functions

    public function addOrg(Request $request){
        

        try {
            $validated = $request-> validate([
                'name' => 'required|unique:organizations',
                'department' => 'required',
    
            ]);

            DB::table('organizations')->updateOrInsert([
                'recruiting'=> false,
                'name'=> $validated['name'],
                'department' => $validated['department'],
                'visibility' => 1,
                
            ]);

            session()->flash('toast', [
                'title' => 'Saved',
                'description' => 'Organization added successfully!',
                'variant' => 'success'
            ]);

            return to_route('superadmin.status');
        } catch (Exception $e) {

            session()->flash('toast', [
                'title' => 'Failed',
                'description' => 'Organization already exists',
                'variant' => 'destructive'
            ]);


            return redirect()->back()->with('error', 'An error occurred while assigning the admin role.');
        }
   
    }


    public function editOrg(Request $request) {
        try {
            $organization = Organization::findOrFail($request->orgId);
    
            $validated = $request->validate([
                'orgId' => 'required',
                'name' => ['required', Rule::unique('organizations', 'name')->ignore($organization->orgID, 'orgID')],
                'department' => 'required',
            ]);
    
            $organization->update([
                'name' => $validated['name'],
                'department' => $validated['department'],
            ]);
    
            session()->flash('toast', [
                'title' => 'Saved',
                'description' => 'Organization edited successfully!',
                'variant' => 'success'
            ]);
    
            return redirect()->back()->with([
                'organizations' => Organization::all(),
                'departments' => Organization::distinct('department')->pluck('department'),
            ]);
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Failed',
                'description' => 'Organization already exists.',
                'variant' => 'destructive'
            ]);
    
            return redirect()->back()->with('error', 'An error occurred while editing the organization.');
        }
    }

    public function deleteOrg($id)
{
    $organization = Organization::findOrFail($id);

    
    $organization->delete();

    session()->flash('toast', [
        'title' => 'Deleted',
        'description' => 'Organization deleted successfully!',
        'variant' => 'success'
    ]);

    return redirect()->back();
}

    

public function manage(Request $request)
{
    $query = Organization::query()->withCount('members');
    
    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function($q) use ($searchTerm) {
            $q->where('name', 'LIKE', "%{$searchTerm}%")
              ->orWhere('department', 'LIKE', "%{$searchTerm}%");
        });
    }
    
    if ($request->filled('department') && $request->department !== 'All') {
        $query->where('department', $request->department);
    }
    
    $organizations = $query->paginate(12)
                         ->withQueryString(); 
    
    $recruitment = DB::table('settings')
                    ->where('name', 'Recruitment')
                    ->value('status');

    return Inertia::render('SuperAdmin/SuperAdminManage', [
        'recruitment' => $recruitment,
        'organizations' => $organizations,
        'departments' => Organization::distinct()->pluck('department'),
        'filters' => $request->only(['search', 'department']) 
    ]);
}


    public function toggleRecruitment(Request $request)
    {
    $status = $request->input('status');
    
    DB::table('settings')
        ->where('name', 'Recruitment')
        ->update(['status' => $status]);

        if($status){

            session()->flash('toast', [
                'title' => 'Recruitment Enabled for All Organization',
                'description' => 'Status Updated Successfully!',
                'variant' => 'success'
            ]);
        }else{
            DB::table('organizations')
            ->update(['recruiting' => false]);

            session()->flash('toast', [
                'title' => 'Recruitment Disabled for All Organization',
                'description' => 'Status Updated Successfully!',
                'variant' => 'destructive'
            ]);
        }

    return Inertia::render('SuperAdmin/SuperAdminManage', [
        'recruitment' => $status,
        'organizations' => Organization::withCount('members')->get(),
        'departments' => Organization::distinct()->pluck('department')
    ]);
    }


    public function updateOrganizations(Request $request)
    {
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

    public function searchOrg(Request $request)
    {
        $query = Organization::query();

        if ($request->filled('query')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', "%" . $request->input('query') . "%")
                    ->orWhere('department', 'LIKE', "%" . $request->input('query') . "%");
            });
        }

        if ($request->filled('category') && $request->input('category') !== 'All') {
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

    public function searchUser(Request $request)
    {
        $query = User::query();

        if ($request->filled('query')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', "%" . $request->input('query') . "%")
                    ->orWhere('email', 'LIKE', "%" . $request->input('query') . "%");
            });
        }
        
        $users = $query->get();

        return response()->json([
            'users' => $users,
        ]);
    }

    public function invite(Request $request)
{
    $query = User::query()
        ->join('organization_user_role', 'users.userID', '=', 'organization_user_role.userID')
        ->where('organization_user_role.roleID', 2)
        ->select('users.userID', 'users.email', 'users.firstname', 'users.lastname', 'users.college', 'users.status')
        ->distinct()
        ->withCount('organizations');

    // Add search functionality
    if ($request->filled('search')) {
        $searchTerm = $request->search;
        $query->where(function($q) use ($searchTerm) {
            $q->where('firstname', 'LIKE', "%{$searchTerm}%")
                ->orWhere('lastname', 'LIKE', "%{$searchTerm}%")
                ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ["%{$searchTerm}%"])
                ->orWhereRaw("CONCAT(lastname, ' ', firstname) LIKE ?", ["%{$searchTerm}%"]);
        });
    }

    $admins = $query->paginate(20)->withQueryString();

    $userRoles = DB::table('organization_user_role')
        ->join('roles', 'organization_user_role.roleID', '=', 'roles.roleID')
        ->join('organizations', 'organization_user_role.orgID', '=', 'organizations.orgID')
        ->get();

    return Inertia::render('SuperAdmin/SuperAdminInvite', [
        'users' => $admins,
        'userRoles' => $userRoles,
        'organizations' => Organization::all(),
        'filters' => $request->only(['search'])
    ]);
}


    public function search(Request $request)
    {
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


    public function addAdmin(Request $request)
    {
        $validated = $request->validate([
            'userID' => 'required|exists:users,userID',
            'orgID' => 'required|exists:organizations,orgID',
            'roleID' => 'required|exists:roles,roleID',
        ]);

        



        try {

            $currentAdminCount = DB::table('organization_user_role')
            ->where('orgID', $validated['orgID'])
            ->where('roleID', '=', '2') 
            ->count();


            if ($currentAdminCount >= 3) {
                
                session()->flash('toast', [
                    'title' => 'Failed to the add the user',
                    'description' => 'The organization already has the maximum number of admins (Max: 3).',
                    'variant' => 'destructive'
                ]);
                return redirect()->back();
            }


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


            $user = User::find($validated['userID']);
            $org = Organization::find($validated['orgID']);

            $user->notify(new MakeAdminNotification($org, $user));

            return to_route('superadmin.invite');
        } catch (Exception $e) {

            return redirect()->back()->with('error', 'An error occurred while assigning the admin role.');
        }
    }

    public function deleteAdmin($userID)
    {

        // $validated = $request->validate([
        //     'userID' => 'required|exists:users,userID',
        // ]);

        try {
            // Delete all records related to the given userID from the organization_user_role table
            DB::table('organization_user_role')
                ->where('userID', $userID)

                ->delete();

            session()->flash('toast', [
                'title' => 'Success',
                'description' => 'Admin privileges revoked successfully!',
                'variant' => 'success'
            ]);

            return redirect()->route('superadmin.invite');
        } catch (Exception $e) {


            session()->flash('toast', [
                'title' => 'Failed',
                'description' => 'Changes Unsuccessful.',
                'variant' => 'destructive'
            ]);
            return redirect()->back();
        }
    }

    //for specific org

    public function deleteAdminRole($userID, $orgID)
{
    try {
        DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->where('roleID', 2)
            ->delete();

            $user = User::find($userID);
            $org = Organization::find($orgID);

            $user->notify(new RemoveAdminNotification($org, $user));

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'Admin role removed successfully!',
            'variant' => 'success'
        ]);



        return redirect()->route('superadmin.invite');
    } catch (Exception $e) {
        session()->flash('toast', [
            'title' => 'Failed',
            'description' => 'Failed to remove admin role.',
            'variant' => 'destructive'
        ]);
        return redirect()->back();
    }
}



    //file upload functions

    public function fileupload()
    {
        return Inertia::render('SuperAdmin/SuperAdminDataUpload');
    }

    private function handleStudentUpload($studentFile) {
        $studentData = fopen($studentFile, 'r');            
        $studentChunks = [];

        try {
            $dumpHeader = fgetcsv($studentData); // skip the header in the csv file
            
            while ($data = fgetcsv($studentData)) {
                $existingUser = User::find($data[0]);

                if ($existingUser != null) {         
                    if ($existingUser->email != $data[1]) {  // to check if user has changed their email 
                        $existingUser->email = $data[1];
                        $existingUser->save();
                    }
                } else {
                    $studentChunks[] = [
                        "userID" => $data[0],   
                        "email" => $data[1],
                        "firstname" => $data[2],
                        "lastname" => $data[3],
                        "middlename" => $data[4],
                        "remember_token" => NULL,
                        "status" => "student",
                        "college" => $data[7],
                    ];
                }

                if (count($studentChunks) === 1000) {
                    User::insert($studentChunks);
                    $studentChunks = [];
                }
            }

            if (!empty($studentChunks)) { // insert the rest in studentChunks
                User::insert($studentChunks);
            }    
        } catch (Exception $e) {
            // TO-DO: return with proper error
            session()->flash('toast', [
                'title' => 'Failed to upload',
                'description' => 'Please double check the File',
                'variant' => 'destructive'
            ]);
            return redirect()->back()->with('error');
        }

        fclose($studentData);

        session()->flash('toast', [
            'title' => 'File Uploaded Successfully',
            'description' => 'The users list has been updated',
            'variant' => 'success'
        ]);
        return redirect()->back();
    }

    private function handleOrganizationUpload($organizationFile) {
        try {
            $fileTypeValidator = Validator::make(['organizationFile' => $organizationFile], [
                'organizationFile' => ['required', 'file', 'mimes:json']
            ]);

            if ($fileTypeValidator->fails()) {
                session()->flash('toast', [
                    'title' => 'Failed to upload',
                    'description' => 'File type must be JSON (.json)',
                    'variant' => 'destructive'
                ]);
                
                return redirect()->back()->with('error');
            }

            $submittedData= json_decode(file_get_contents($organizationFile), true);
            
            $contentValidator = Validator::make($submittedData, [
                '*.name' => ['required', 'string'],
                '*.department' => ['required', 'string'],
            ]);

            if ($contentValidator->fails()) {
                session()->flash('toast', [
                    'title' => 'Failed to upload',
                    'description' => 'Please double check the JSON File',
                    'variant' => 'destructive'
                ]);

                return redirect()->back()->with('error');
            }

        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Failed to upload',
                'description' => 'Please double check the JSON File',
                'variant' => 'destructive'
            ]);
            return redirect()->back()->with('error');
            
        }
        
        $existingOrgs = Organization::all()->toArray();

        $submittedDataNames = [];
        $existingOrgNames = [];

        foreach($submittedData as $org) {
            $submittedDataNames[] = $org['name'];
        }

        foreach($existingOrgs as $org) {
            $existingOrgNames[] = $org['name'];
        }

        // mass update
        Organization::query()->update(['visibility' => true]);

        // get the names of the orgs that should be hidden
        $orgNamesToHide = array_diff($existingOrgNames, $submittedDataNames);

        // get the name of the newly added orgs
        $newOrgNames = array_diff($submittedDataNames, $existingOrgNames);
    
        if (!empty($orgNamesToHide)) {
            Organization::whereIn('name', $orgNamesToHide)->update(['visibility' => false]);
        }

        if (!empty($newOrgNames)) {
            foreach ($newOrgNames as $newOrgName) {
                $newOrgData = collect($submittedData)->firstWhere('name', $newOrgName);
    
                Organization::create([
                    'name' => $newOrgData['name'],
                    'department' => $newOrgData['department'],
                ]);
            }
        }
        
    
        session()->flash('toast', [
            'title' => 'File Uploaded Successfully',
            'description' => 'The organization list and status was updated',
            'variant' => 'success'
        ]);
        return redirect()->back();
    }

    public function upload(Request $request) {
        if ($request->studentFile == null && $request->organizationFile == null) {
            session()->flash('toast', [
                'title' => 'Failed to upload',
                'description' => 'Student or Organization file must not be empty',
                'variant' => 'destructive'
            ]);
            return redirect()->back()->withErrors('error');
        }

        if ($request->studentFile != null) {
            $this->handleStudentUpload($request->file('studentFile'));
        } 
        if ($request->organizationFile != null) { 
            $this->handleOrganizationUpload($request->file('organizationFile'));
        } 
    }

    // Activity log tab functions
    public function viewLoginHistory(): Response
    {
        // $loginEntries = DB::table('superadmin_login_history')
        //     ->join('users', 'superadmin_login_history.userID', '=', 'users.userID')
        //     ->select('users.firstname', 'users.middlename', 'users.lastname', 'superadmin_login_history.login_timestamp')
        //     ->orderByDesc('superadmin_login_history.loginID')
        //     ->get()
        //     ->map(function ($entry) {
        //         $loginTime = Carbon::parse($entry->login_timestamp);
        //         $entry->login_date = $loginTime->format('M-d-Y'); // "2024-09-19"
        //         $entry->login_time = $loginTime->format('h:i A'); // "07:56 PM"
        //         return $entry;
        //     });

        // $loginEntries = DB::table('superadmin_login_history')
        // ->join('users', 'superadmin_login_history.userID', '=', 'users.userID')
        // ->select('users.firstname', 'users.middlename', 'users.lastname', 'superadmin_login_history.login_timestamp')
        // ->orderByDesc('superadmin_login_history.loginID')
        // ->paginate(10);


        $loginEntries = DB::table('superadmin_login_history')
            ->join('users', 'superadmin_login_history.userID', '=', 'users.userID')
            ->select('users.firstname', 'users.middlename', 'users.lastname', 'superadmin_login_history.login_timestamp')
            ->orderByDesc('superadmin_login_history.loginID')
            ->paginate(20); // Use paginate() instead of get()

        // Apply the formatting to each entry
        // HINDI ERROR YUNG map() IGNORE
        $loginEntries->map(function ($entry) {
            $loginTime = Carbon::parse($entry->login_timestamp);
            $entry->login_date = $loginTime->format('M-d-Y'); // "Aug-15-2024"
            $entry->login_time = $loginTime->format('h:i A'); // "07:56 PM"
            return $entry;
        });


        // dd($loginEntries);
        return Inertia::render('SuperAdmin/SuperAdminLoginHistory', [
            'loginEntries' => $loginEntries,
        ]);
    }

    public function filedownload()
    {
        return Inertia::render('SuperAdmin/SuperAdminDataDownload');
    }

    //json download for e-sorr

    public function export()
    {
        $organizations = Organization::with(['members' => function ($query) {
            $query->select('users.userID', 'firstname', 'lastname', 'email')
                  ->orderBy('lastname');
        }])->get()
        ->map(function ($org) {
            return [
                'organization_name' => $org->name,
                'members' => $org->members->map(function ($member) {
                    return [
                        'firstName' => $member->firstname,
                        'middleName' => $member->middlename,
                        'lastname' => $member->lastname,
                        'studentNumber' => $member->userID,
                    ];
                })
            ];
        });


        $filename = 'organizations-members-' . date('Y-m-d') . '.json';
        
        return response()->json($organizations)
            ->header('Content-Disposition', 'attachment; filename=' . $filename)
            ->header('Content-Type', 'application/json');
    }

}
