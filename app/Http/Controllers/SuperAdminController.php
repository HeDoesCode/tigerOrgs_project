<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Officer;
use PDO;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Organization;
use App\Models\Photo;
use App\Notifications\MakeAdminNotification;
use App\Notifications\RecruitmentStatusNotification;
use App\Notifications\RemoveAdminNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\PostDec;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Typography\FontFactory;

use function Laravel\Prompts\error;

class SuperAdminController extends Controller
{
    //manage org functions

    public function addOrg(Request $request)
    {


        try {
            $validated = $request->validate([
                'name' => 'required|unique:organizations',
                'department' => 'required',

            ]);

            DB::table('organizations')->updateOrInsert([
                'recruiting' => false,
                'name' => $validated['name'],
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


    public function editOrg(Request $request)
    {
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
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('department', 'LIKE', "%{$searchTerm}%");
            });
        }

        if ($request->filled('department') && $request->department !== 'All') {
            $query->where('department', $request->department);
        }

        $organizations = $query->select('*', 'visibility') 
            ->withCount('members')
            ->paginate(12)
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





    public function updateOrganizations(Request $request)
    {
        foreach ($request->organizations as $organization) {
            $dataToUpdate = ['visibility' => $organization['visibility']];
            if (!$organization['visibility']) {
                $dataToUpdate['recruiting'] = false;
            }

            Organization::where('orgID', $organization['id'])->update($dataToUpdate);
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
            $query->where(function ($q) use ($searchTerm) {
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
            

            DB::table('admin_invite_history')->updateOrInsert(
                [
                    'inviter_userID' => Auth::id(),
                    'invited_userID' => $validated['userID'],
                    'orgID' => $validated['orgID'],
                ],
                [
                    'invite_timestamp' => now(),
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

    private function handleStudentUpload($studentFile)
    {
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

        DB::table('superadmin_login_history')->insert([ 
            'userID' => Auth::id(),
            'action' => 'uploaded a new Student List',
            'login_timestamp' => now(),
         ]);

        session()->flash('toast', [
            'title' => 'File Uploaded Successfully',
            'description' => 'The users list has been updated',
            'variant' => 'success'
        ]);
        return redirect()->back();
    }

    private function handleOrganizationUpload($organizationFile)
    {
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

            $submittedData = json_decode(file_get_contents($organizationFile), true);

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

        foreach ($submittedData as $org) {
            $submittedDataNames[] = $org['name'];
        }

        foreach ($existingOrgs as $org) {
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

                $organizationID = Organization::create([
                    'name' => $newOrgData['name'],
                    'logo' => $this->generateDefaultImage(strtoupper(substr($newOrgData['name'], 0, 1))),
                    'department' => $newOrgData['department'],
                ])->orgID;

                Photo::create([
                    'orgID' => $organizationID,
                ]);
            }
        }

        DB::table('superadmin_login_history')->insert([ 
            'userID' => Auth::id(),
            'action' => 'uploaded a new Organization List',
            'login_timestamp' => now(),
         ]);


        session()->flash('toast', [
            'title' => 'File Uploaded Successfully',
            'description' => 'The organization list and status was updated',
            'variant' => 'success'
        ]);
        return redirect()->back();
    }

    private function generateDefaultImage($character)
    {
        $image = Image::create(720,720)
                    ->fill(sprintf('#%06X', mt_rand(0, 0xFFFFFF))."50")
                    ->text($character, 360, 360, function(FontFactory $font) {
                        $font->filename(public_path('fonts/Nunito-Regular.ttf'));
                        $font->size(500);
                        $font->align('center');
                        $font->valign('middle');
                    });

        $generated_filename = hexdec(uniqid()).".jpeg";

        $filename = "logo/$generated_filename";

        $path = Storage::disk('public')->path($filename);

        $image->toJpeg()->save($path);

        return $generated_filename;
    }

    public function upload(Request $request)
    {
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
            ->select('users.firstname', 'users.middlename', 'users.lastname', 'superadmin_login_history.action', 'superadmin_login_history.login_timestamp')
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

    public function viewInviteHistory()
    {
        
        $inviteEntries = DB::table('admin_invite_history')
        ->join('users as inviter', 'admin_invite_history.inviter_userID', '=', 'inviter.userID')
        ->join('users as invited', 'admin_invite_history.invited_userID', '=', 'invited.userID')
        ->join('organizations', 'admin_invite_history.orgID', '=', 'organizations.orgID')
        ->select(
            'admin_invite_history.invite_timestamp',
            'inviter.firstname as inviter_firstname',
            'inviter.lastname as inviter_lastname',
            'invited.firstname as invited_firstname',
            'invited.lastname as invited_lastname',
            'organizations.name'
        )
        ->orderByDesc('admin_invite_history.inviteID')
        ->paginate(20);

        // Apply the formatting to each entry
        // HINDI ERROR YUNG map() IGNORE
        $inviteEntries->getCollection()->transform(function ($entry) {
            $inviteTime = Carbon::parse($entry->invite_timestamp);
            $entry->invite_date = $inviteTime->format('M-d-Y'); // e.g., "Dec-15-2024"
            $entry->invite_time = $inviteTime->format('h:i A'); // e.g., "07:56 PM"
            return $entry;
        });

        


        // dd($loginEntries);
        return Inertia::render('SuperAdmin/SuperAdminInviteHistory', [
            'inviteEntries' => $inviteEntries,
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

        DB::table('superadmin_login_history')->insert([ 
            'userID' => Auth::id(),
            'action' => 'downloaded the Members JSON File',
            'login_timestamp' => now(),
         ]);

        return response()->json($organizations)
            ->header('Content-Disposition', 'attachment; filename=' . $filename)
            ->header('Content-Type', 'application/json');
    }

    public function settings()
    {
        $settings = DB::table('settings')
            ->whereIn('name', ['Recruitment', 'Manual Registration'])
            ->select('name', 'status', 'start_date', 'end_date')
            ->get()
            ->keyBy('name');
        
        return Inertia::render('SuperAdmin/SuperAdminSettings', [
            'recruitment' => $settings['Recruitment']->status ?? false,
            'recruitmentStartDate' => $settings['Recruitment']->start_date ?? substr(now()->toIso8601String(),0, 16),
            'recruitmentEndDate' => $settings['Recruitment']->end_date ?? null,
            'manualreg' => $settings['Manual Registration']->status ?? false,
            'manualRegStartDate' => $settings['Manual Registration']->start_date ?? substr(now()->toIso8601String(),0, 16),
            'manualRegEndDate' => $settings['Manual Registration']->end_date ?? null,
        ]);
    }

public function toggleSetting(Request $request)
{
    $request->validate([
        'settingName' => 'required|in:Recruitment,Manual Registration',
        'status' => 'boolean',
        'start_date' => ['sometimes', 'required', 'date', 'after_or_equal:today'],
        'end_date' => ['sometimes', 'required', 'date', 'after:start_date'],
    ]);

    $settingName = $request->input('settingName');
    $status = $request->input('status');
    
    if ($request->has('start_date') && $request->has('end_date')) {
        $startDate = $request->input('start_date') 
            ? Carbon::parse($request->input('start_date'))->format('Y-m-d H:i:s') 
            : null;
        $endDate = $request->input('end_date') 
            ? Carbon::parse($request->input('end_date'))->format('Y-m-d H:i:s') 
            : null;
    }
        
    // Update dates and status
    $updateData = [
        'status' => $status,
        'start_date' => $startDate ?? null,
        'end_date' => $endDate ?? null
    ];

    DB::table('settings')
        ->where('name', $settingName)
        ->update($updateData);

    // Notify admins
    $this->notifyAdmins($settingName, $status);

    // Log activity
    $this->logActivity($settingName, $status);

    // Flash success message
    session()->flash('toast', [
        'title' => "Setting Updated",
        'description' => $settingName . ' status updated successfully!',
        'variant' => 'success',
    ]);

    return redirect()->route('superadmin.settings');
}

private function notifyAdmins(string $settingName, bool $status)
{
    $admins = DB::table('users')
        ->join('organization_user_role', 'users.userID', '=', 'organization_user_role.userID')
        ->where('organization_user_role.orgID', 2)
        ->get();

    foreach ($admins as $admin) {
        $user = \App\Models\User::find($admin->userID); 
        if ($user) {
            $user->notify(new RecruitmentStatusNotification($status));
        }
    }
}

private function logActivity(string $settingName, bool $status)
{
    $actionMessage = $status 
        ? "turned on the {$settingName} Settings" 
        : "turned off the {$settingName} Settings";

    DB::table('superadmin_login_history')->insert([ 
        'userID' => Auth::id(),
        'action' => $actionMessage,
        'login_timestamp' => now(),
    ]);
}

    public function previewOrganizationData($orgID)
    {
        $organization = Organization::withCount('members')
            ->with('officers.user')
            ->with('contacts')
            ->find($orgID);

        $officers = Officer::where('orgID', $orgID);

        if ($officers->exists()) {
            $latestCreatedAt = $officers->max('created_at');
            $latestUpdatedAt = $officers->max('updated_at');

            // Get the most recent date and format it
            $latestOfficerUpdateDate = Carbon::parse(max($latestCreatedAt, $latestUpdatedAt))
                ->format('M. d, Y');
        } else {
            $latestOfficerUpdateDate = 'N/A';
        }

        $pageData = [
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            'aboutUs' => $organization->description,
            'fb_link' => $organization->fb_link,
            'contacts' => $organization->contacts,
            'officers' => $organization->officers,
            'latestOfficerUpdate' => $latestOfficerUpdateDate,
            'photos' => $this->getOrgPhotos($orgID),
        ];

        return response()->json([
            'pageData' => $pageData,
            'pageLayoutData' => $this->getPageLayoutData($orgID),
            'withFollow' => true,
        ]);
    }

    public function getOrgPhotos($orgID)
    {
        $organization = Organization::with('photos')->find($orgID);
        $photos = [];

        foreach ($organization->photos as $photo) {
            $photos[] = [
                'photoID' => $photo['photoID'],
                'orgID' => $photo['orgID'],
                'caption' => $photo['caption'],
                'filename' => Storage::url('public/photo/' . $photo['filename']),
            ];
        }

        return $photos;
    }

    public function getPageLayoutData($orgID)
    {
        $organization = Organization::withCount('members')
            ->with('keywords')
            ->findOrFail($orgID);

        $isInOrgHome = true;

        $deployedForms = $isInOrgHome
            ? Form::where([
                'orgID' => $orgID,
                'deployed' => true,
            ])->get()
            : [];

        return [
            'forms' => $deployedForms,
            'orgID' => $organization->orgID,
            'logo' => Storage::url("public/logo/" . $organization->logo),
            'coverPhoto' => Storage::url("public/coverPhoto/" . $organization->coverPhoto),
            'metadata' => [
                'keywords' => $organization->keywords ?: [],
                'department' => $organization->department,
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            'recruiting' => $organization->recruiting,
        ];
    }

    public function manual()
    {
        return Inertia::render('SuperAdmin/SuperAdminManual');
    }

    public function download($filename)
    {
        switch ($filename) {
            case 'manual': {
                    return Storage::download('private/Manuals/User Manual - Super Admin.pdf');
                }
        }
    }
}
