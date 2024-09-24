<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use Inertia\Controller;
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
    $membersWithPositions = \DB::table('organization_user_role')
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

    $admins = $membersWithPositions->filter(fn($member) => $member->roleID == 2);
    $students = $membersWithPositions->filter(fn($member) => $member->roleID == 1);

    $organization = Organization::withCount('members')
        ->with('contacts')
        ->find($orgID);

    return Inertia::render('Admin/AdminInvite', [
        'orgID' => $organization->orgID,
        'organizationName' => $organization->name,
        'members' => $students->values(),
        'admins' => $admins->values(),
        'contacts' => $organization->contacts,
    ]);
}


public function makeAdmin(Request $request, $orgID)
{
    $userID = $request->input('userID'); 

    $exists = \DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        \DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->update(['roleID' => 2]);

        $user = User::find($userID);

        $user->notify(new AdminPromotionNotification());

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'User has been made an Admin!',
            'variant' => 'success'
        ]);

        return response()->json(['message' => 'User role updated to admin successfully.']);
    } else {
        return response()->json(['message' => 'User is not a member of the organization.'], 400);
    }
}

public function makeMember(Request $request, $orgID)
{
    $userID = $request->input('userID'); 
    $exists = \DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        \DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->update(['roleID' => 1]);

            session()->flash('toast', [
                'title' => 'Success',
                'description' => 'User has been made a Member!',
                'variant' => 'success'
            ]);    } else {
        return response()->json(['message' => 'User is not a member of the organization.'], 400);
    }
}

public function removeStudent(Request $request, $orgID)
{
    $userID = $request->input('userID'); 

    $exists = \DB::table('organization_user_role')
        ->where('userID', $userID)
        ->where('orgID', $orgID)
        ->exists();

    if ($exists) {
        \DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->delete(); 

        session()->flash('toast', [
            'title' => 'Success',
            'description' => 'User has been removed from the organization!',
            'variant' => 'success'
        ]);

        return response()->json(['message' => 'User removed successfully.']);
    } else {
        return response()->json(['message' => 'User is not a member of the organization.'], 400);
    }
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
