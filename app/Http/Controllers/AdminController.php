<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\User;
use App\Notifications\AdminAnnouncementNotification;
use App\Notifications\MakeAdminNotification;
use App\Notifications\RemoveAdminNotification;
use App\Models\Form;
use Exception;
use Inertia\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
            'fb_link' => $organization->fb_link,
            'contacts' => $organization->contacts,
            'officers' => $organization->officers,
            'photos' => $organization->photos,
        ];

        $organization_controller = new OrganizationController();
        $pageLayoutData = $organization_controller->getPageLayoutData($organization->orgID);

        return Inertia::render('Admin/AdminEditPage', [
            'pageData' => $pageData,
            'pageLayoutData' => $pageLayoutData,
            'orgID' => $orgID,
        ]);
    }

    public function forms($orgID)
    {
        $organization = Organization::find($orgID);
        $forms = Form::where('orgID', $orgID)
            ->get();

        $recruitmentStatusofOSA = DB::table('settings')->where('name', 'Recruitment')->value('status');
        $recruitmentStatusofOrg = DB::table('organizations')->where('orgID', $orgID)->value('recruiting');

        return Inertia::render('Admin/AdminManageForms', [
            'recruitmentStatusofOSA' => $recruitmentStatusofOSA,
            'recruitmentStatusofOrg' => $recruitmentStatusofOrg,
            'orgID' => $organization->orgID,
            'orgName' => $organization->name,
            'forms' => $forms,
        ]);
    }

    public function toggleRecruitment(Request $request, $orgID )
    {
    $recruiting = $request->input('status');

    DB::table('organizations')
        ->where('orgID', $orgID)
        ->update(['recruiting' => $recruiting]);

        $organization = Organization::find($orgID);
        $forms = Form::where('orgID', $orgID)
            ->get();

            
    if($recruiting){
        session()->flash('toast', [
            'title' => 'Recruitment Enabled for '. $organization->name,
            'description' => 'Status Updated Successfully!',
            'variant' => 'success'
        ]);
    }else{
        session()->flash('toast', [
            'title' => 'Recruitment Disabled for '. $organization->name,
            'description' => 'Status Updated Successfully!',
            'variant' => 'destructive'
        ]);
    }

        $recruitmentStatusofOSA = DB::table('settings')->where('name', 'Recruitment')->value('status');
        $recruitmentStatusofOrg = DB::table('organizations')->where('orgID', $orgID)->value('recruiting');

        return Inertia::render('Admin/AdminManageForms', [
            'recruitmentStatusofOSA' => $recruitmentStatusofOSA,
            'recruitmentStatusofOrg' => $recruitmentStatusofOrg,
            'orgID' => $organization->orgID,
            'orgName' => $organization->name,
            'forms' => $forms,
        ]);
    }

    public function saveEdit(Request $request)
    {
        $request->validate([
            'aboutUs' => ['nullable', 'string'],
            'fb_link' => ['nullable', 'string', 'url'],
            'logo' => ['nullable', 'file', 'max:2048', 'mimes:png,jpg,jpeg'],
            'coverPhoto' => ['nullable', 'file', 'max:2048', 'mimes:png,jpg,jpeg'],
        ]);

        $editedOrg = Organization::find($request->orgID);
        $editedOrg->description = $request->aboutUs;
        $editedOrg->fb_link = $request->fb_link;

        if ($request->hasFile('logo')) {
            $logo = Storage::disk('logos')->put('/', $request->file('logo'));
            $editedOrg->logo = $logo;
        }

        if ($request->hasFile('coverPhoto')) {
            $cover = Storage::disk('covers')->put('/', $request->file('coverPhoto'));
            $editedOrg->cover = $cover;
        }


        $editedOrg->save();


        dd("update success");
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

    public function makeAnnouncement(Request $request, $orgID)
    {

        try {
            $validated = $request->validate([
                'orgID' => 'required|exists:organizations,orgID',
                'message' => 'required|max:250',
            ]);

            $message = $validated['message'];


            $organization = Organization::findOrFail($orgID);
            $members = $organization->members()->get();

            foreach ($members as $member) {
                $member->notify(new AdminAnnouncementNotification($organization, $message));
            }


            session()->flash('toast', [
                'title' => 'Announcement Sent',
                'description' => 'Members of the Organization will be Notified',
                'variant' => 'success'
            ]);
        } catch (Exception $e) {
        }
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

            $user = User::find($validated['userID']);
            $org = Organization::find($validated['orgID']);

            $user->notify(new MakeAdminNotification($org, $user));

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

            $user = User::find($userID);
            $org = Organization::find($orgID);

            $user->notify(new MakeAdminNotification($org, $user));

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

            $user = User::find($userID);
            $org = Organization::find($orgID);

            $user->notify(new RemoveAdminNotification($org, $user));

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

    public function formhistory($orgID)
    {
        $organization = Organization::find($orgID);

        return Inertia::render('Admin/AdminFormHistory', [
            'orgID' => $organization->orgID,
        ]);
    }
}
