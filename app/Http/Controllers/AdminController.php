<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\User;
use Inertia\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function edit($orgID)
    {
        $organization = Organization::withCount('members')
            ->with('officers.user')
            ->with('contacts')
            ->find($orgID);
        $pageData = [
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            'aboutUs' => $organization->description,
            'contacts' => $organization->contacts,
            'officers' => $organization->officers,
            'photos' => $organization->photos,
        ];

        // $pageLayoutData = [
        //     'orgID'=>$organization->orgID,
        //     'logo' => $organization->logo,
        //     'coverPhoto' => $organization->cover,
        //     'metadata' => [
        //         'organizationName' => $organization->name,
        //         'members' => $organization->members_count,
        //     ],
        // ];
        $organization_controller = new OrganizationController();
        $pageLayoutData = $organization_controller->getPageLayoutData($organization->orgID);

        // dump($pageData);
        return Inertia::render('Admin/AdminEditPage', [
            'pageData' => $pageData,
            'pageLayoutData' => $pageLayoutData,
            'orgID' => $orgID,
        ]);
    }

    public function invite($orgID)
    {
        $membersWithPositions = DB::table('organization_user_role')
            ->join('users', 'organization_user_role.userID', '=', 'users.userID')
            ->leftJoin('organization_officers', function ($join) use ($orgID) {
                $join->on('organization_user_role.userID', '=', 'organization_officers.userID')
                    ->where('organization_officers.orgID', '=', $orgID);
            })
            ->select(
                'users.userID',
                'users.firstname',
                'users.lastname',
                'users.email',
                'users.college',
                'organization_user_role.roleID',
                'organization_officers.position'
            )
            ->where('organization_user_role.orgID', $orgID)
            ->get();

        $admins = $membersWithPositions->where('roleID', 2);
        $students = $membersWithPositions->where('roleID', 1);

        $organization = Organization::withCount('members')
            ->with('contacts')
            ->findOrFail($orgID);

        return Inertia::render('Admin/AdminInvite', [
            'orgID' => $organization->orgID,
            'organizationName' => $organization->name,
            'members' => $students->values(),
            'admins' => $admins->values(),
            'contacts' => $organization->contacts,
        ]);
    }



    //search function and invite manually
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


    public function addAdmin(Request $request, $orgID)
    {

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
                'description' => 'User Assigned to the Organization.',
                'variant' => 'success'
            ]);

            return to_route('admin.invite', ['orgID' => $orgID]);
        } catch (Exception $e) {

            return redirect()->back()->with('error', 'An error occurred while assigning the admin role.');
        }
    }


    //actions for admin
    public function makeAdmin(Request $request, $orgID)
{
    $userID = $request->input('userID');

    $exists = DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->update(['roleID' => 2]);

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'User has been made an Admin!',
            'variant' => 'success',
        ]);

        return to_route('admin.invite', ['orgID' => $orgID]);
    }

    session()->flash('toast', [
        'title' => 'Error',
        'description' => 'User is not a member of the organization.',
        'variant' => 'destructive',
    ]);

    return to_route('admin.invite', ['orgID' => $orgID]);
}

public function makeMember(Request $request, $orgID)
{
    $userID = $request->input('userID');

    $exists = DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->update(['roleID' => 1]);

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'User was removed as Admin!',
            'variant' => 'success',
        ]);

        return to_route('admin.invite', ['orgID' => $orgID]);
    }

    session()->flash('toast', [
        'title' => 'Error',
        'description' => 'User is not a member of the organization.',
        'variant' => 'destructive',
    ]);

    return to_route('admin.invite', ['orgID' => $orgID]);
}

public function removeStudent(Request $request, $orgID)
{
    $userID = $request->input('userID');

    $exists = DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->delete();

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'User has been removed from the organization!',
            'variant' => 'success',
        ]);

        return to_route('admin.invite', ['orgID' => $orgID]);
    }

    session()->flash('toast', [
        'title' => 'Error',
        'description' => 'User is not a member of the organization.',
        'variant' => 'destructive',
    ]);

    return to_route('admin.invite', ['orgID' => $orgID]);
}



    public function applications($orgID)
    {
        $organization = Organization::find($orgID);


        return Inertia::render('Admin/AdminManageApplication', [
            'orgID' => $organization->orgID,
        ]);
    }

    public function forms($orgID)
    {

        $organization = Organization::find($orgID);

        return Inertia::render('Admin/AdminManageForms', [
            'orgID' => $organization->orgID,
        ]);
    }

    public function formhistory($orgID)
    {
        $organization = Organization::find($orgID);

        return Inertia::render('Admin/AdminFormHistory', [
            'orgID' => $organization->orgID,
        ]);
    }
    
}
