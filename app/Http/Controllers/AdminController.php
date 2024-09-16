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
        $organization = Organization::withCount('members')
            ->with('officers.user')
            ->with('contacts')
            ->find($orgID);
    
        // Get the users with their roles in the organization
        $members = \DB::table('organization_user_role')
            ->join('users', 'organization_user_role.userID', '=', 'users.userID')
            ->join('roles', 'organization_user_role.roleID', '=', 'roles.roleID')
            ->select('users.*', 'roles.roleID')
            ->where('organization_user_role.orgID', $orgID)
            ->get();
    
        $admins = $members->filter(fn($member) => $member->roleID == 2);
        $students = $members->filter(fn($member) => $member->roleID == 1); 
    
        return Inertia::render('Admin/AdminInvite', [
            'orgID' => $organization->orgID,
            'organizationName' => $organization->name,
            'members' => $students->values(), 
            'admins' => $admins->values(), 
            'officers' => $organization->officers, 
            'contacts' => $organization->contacts, 
        ]);
        
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
