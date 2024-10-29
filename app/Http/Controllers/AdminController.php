<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\Photo;
use App\Models\User;
use App\Notifications\AdminAnnouncementNotification;
use App\Notifications\MakeAdminNotification;
use App\Notifications\RemoveAdminNotification;
use App\Models\Form;
use App\Notifications\RecruitingEnabledNotification;
use Exception;
use Inertia\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use League\Flysystem\StorageAttributes;

class AdminController extends Controller
{
    public function edit($orgID)
    {
        $organization = Organization::withCount('members')
            ->with('officers.user')
            ->with('contacts')
            ->with('photos')
            ->find($orgID);
        
        $organization_controller = new OrganizationController();
        $pageLayoutData = $organization_controller->getPageLayoutData($organization->orgID);

        $pageData = [
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            'aboutUs' => $organization->description,
            'fb_link' => $organization->fb_link,
            'contacts' => $organization->contacts,
            'officers' => $organization->officers,
            'photos' => $organization_controller->getOrgPhotos($organization->orgID),
        ];

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
        $organization = Organization::findOrFail($orgID);
            $members = $organization->followers()->get();

            foreach ($members as $member) {
                $member->notify(new RecruitingEnabledNotification($organization));
            }

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

    public function saveAboutUsSection($request, $editedOrg)
    {
        $request->validate([
            'aboutUs' => ['nullable', 'string'],
        ]);

        $editedOrg->description = $request->input('aboutUs');
        $editedOrg->save();
    }

    public function saveFBLinkSection($request, $editedOrg)
    {
        $request->validate([
            'fb_link' => ['nullable', 'url']
        ]);

        $editedOrg->fb_link = $request->input('fb_link');
        $editedOrg->save();
    }

    public function saveLogoSection($request, $editedOrg) 
    {   
        $request->validate([
            'logo' => ['nullable', 'file', 'max:2048', 'mimes:png,jpg,jpeg'],
        ]);

        $logo = Storage::disk('logos')->put('/',$request->file('logo'));
        $editedOrg->logo = $logo;
        $editedOrg->save();
    }
    
    public function saveCoverSection($request, $editedOrg) 
    {   
        $request->validate([
            'cover' => ['nullable', 'file', 'max:2048', 'mimes:png,jpg,jpeg'],
        ]);

        $cover = Storage::disk('covers')->put('/',$request->file('cover'));
        $editedOrg->cover = $cover;
        $editedOrg->save();
    }

    public function saveEdit(Request $request, $orgID, $section)
    {   
        $editedOrg = Organization::find($orgID);

        switch ($section) {
            case "about-us":
                $this->saveAboutUsSection($request, $editedOrg);
                break;
            case "fb-link":
                $this->saveFBLinkSection($request, $editedOrg);
                break;
            case "logo":
                $this->saveLogoSection($request, $editedOrg);
                break;
            case "cover":
                $this->saveCoverSection($request, $editedOrg);
                break;
        }

        // $request->validate([
        //     'photoData' => ['nullable', 'json'],
        //     'photos' => ['nullable', 'array'],
        //     'photos.*' => ['nullable', 'file', 'max:2048', 'mimes:png,jpg,jpeg'],
        // ]);
        
        // if ($request->has('photoData')) {
        //     $photoData = json_decode($request->only('photoData')['photoData']);

        //     foreach ($photoData as $index => $photo) {
        //         if (is_null($photo->photoID)) {
        //             Photo::create([
        //                 'orgID' => $request->orgID,
        //                 'filename' => Storage::disk('org-photos')->put('/', $request->file('photos')[$index]),
        //                 'caption' => $photo->caption,
        //             ]);
        //         } else {
        //             $editedPhoto = Photo::find($photo->photoID);
        //             $editedPhoto->filename = Storage::disk('org-photos')->put('/', $request->file('photos')[$index]);
        //             $editedPhoto->caption = $photo->caption;
        //             $editedPhoto->save();
        //         }
        //     }
        // }

        // $editedOrg->save();

        // dd("update success");
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


    public function addMember(Request $request, $orgID)
    {

        $validated = $request->validate([
            'userID' => 'required|exists:users,userID',
            'orgID' => 'required|exists:organizations,orgID',
            'roleID' => 'required|exists:roles,roleID',
        ]);



        try {

            $userExists = DB::table('organization_user_role')
            ->where('orgID', $validated['orgID'])
            ->where('userID', $validated['userID'])
            ->where(function ($query) {
                $query->where('roleID', '1')
                    ->orWhere('roleID', '2');
            })
            ->exists();

            if ($userExists) {
                
                session()->flash('toast', [
                    'title' => 'Failed to the add the user',
                    'description' => 'The user is already inside the organization.',
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

        $currentAdminCount = DB::table('organization_user_role')
            ->where('orgID', $orgID)
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


        $formsWithApplications = Form::where('orgID', $orgID)
        ->with(['applications' => function ($query) {
            $query->select('applicationID', 'formID', 'userID', 'similarityScore', 'status', 'created_at')
                ->with('user:userID,firstname,lastname,email,college'); 
        }])
        ->get(['formID', 'formLayout', 'orgID']);

        return Inertia::render('Admin/AdminManageApplication', [
            'orgID' => $organization->orgID,
            'formsWithApplications' => $formsWithApplications,
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
