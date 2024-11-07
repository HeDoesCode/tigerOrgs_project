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
use App\Models\Keyword;
use App\Models\Officer;
use App\Notifications\RecruitingEnabledNotification;
use Carbon\Carbon;
use Exception;
use Inertia\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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
            'photos' => $organization_controller->getOrgPhotos($organization->orgID),
        ];

        $keywords = Keyword::pluck('keyword', 'keyID');
        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();

        $orgMembers = User::join('organization_user_role', 'users.userID', '=', 'organization_user_role.userID')
            ->where('organization_user_role.orgID', $orgID)
            ->select('users.*')->get();

        return Inertia::render('Admin/AdminEditPage', [
            'pageData' => $pageData,
            'pageLayoutData' => $pageLayoutData,
            'keywords' => $keywordsArray,
            'orgID' => $orgID,
            'members' => $orgMembers,
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

    public function toggleRecruitment(Request $request, $orgID)
    {
        $recruiting = $request->input('status');

        $isVisible = DB::table('organizations')
            ->where('orgID', $orgID)
            ->value('visibility');
        
            $isVisible = (bool) $isVisible;

        if(!$isVisible){
            session()->flash('toast', [
                'title' => "You can't perform this action.",
                'description' => 'Your Organization is hidden.',
                'variant' => 'destructive'
            ]);

            return redirect()->back()->with('error');

        }

        DB::table('organizations')
            ->where('orgID', $orgID)
            ->update(['recruiting' => $recruiting]);

        $organization = Organization::find($orgID);
        $forms = Form::where('orgID', $orgID)
            ->get();


        if ($recruiting) {
            $organization = Organization::findOrFail($orgID);
            $members = $organization->followers()->get();

            foreach ($members as $member) {
                $member->notify(new RecruitingEnabledNotification($organization));
            }

            session()->flash('toast', [
                'title' => 'Recruitment Enabled for ' . $organization->name,
                'description' => 'Status Updated Successfully!',
                'variant' => 'success'
            ]);
        } else {
            session()->flash('toast', [
                'title' => 'Recruitment Disabled for ' . $organization->name,
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

    public function saveEdit(Request $request, $orgID)
    {
        $rules = [
            // coverPhoto
            'changesMade.storage.coverPhoto' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',

            // logo
            'changesMade.storage.logo' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',

            // aboutUs
            'pageState.pageData.aboutUs' => 'nullable|string|max:65535',

            // keywords
            'pageState.pageLayoutData.keywords.*.keyID' => 'sometimes|integer|exists:keywords,keyID',

            // contacts
            'pageState.pageData.contacts.*.contactID' => 'sometimes|nullable|integer|exists:organization_contacts,contactID',
            'pageState.pageData.contacts.*.orgID' => 'sometimes|integer|exists:organizations,orgID',
            'pageState.pageData.contacts.*.platform' => 'sometimes|string|in:facebook,instagram,linkedin,email,x,default',
            'pageState.pageData.contacts.*.address' => 'sometimes|string|max:255',
            // 'pageState.pageData.contacts.*.contactID' => 'sometimes|nullable|integer|exists:organization_contacts,contactID',
            // 'pageState.pageData.contacts.*.orgID' => 'sometimes|required|integer|exists:organizations,orgID',
            // 'pageState.pageData.contacts.*.platform' => 'sometimes|required|string|in:facebook,instagram,linkedin,email,x,default',
            // 'pageState.pageData.contacts.*.address' => 'sometimes|required|string',

            // fb_link
            'pageState.pageData.fb_link' => 'nullable|string|url|max:255',

            // officers
            'pageState.pageData.officers' => 'sometimes|array',
            'pageState.pageData.officers.*.officerID' => 'sometimes|nullable|integer|exists:organization_officers,officerID',
            'pageState.pageData.officers.*.orgID' => 'sometimes|integer|in:' . $orgID,
            'pageState.pageData.officers.*.userID' => 'sometimes|integer|exists:users,userID',
            'pageState.pageData.officers.*.position' => 'sometimes|string|max:255',
            // ignore user object since userID is provided

            // photos
            'changesMade.storage.photos.*' => [
                'sometimes',
                'image',
                'mimes:jpeg,png,jpg',
                'max:2048',
                function ($attribute, $value, $fail) {
                    try {
                        if ($value->getClientOriginalName() === 'default.jpeg') {
                            $fail('The file name "default.jpeg" is not allowed.');
                        }
                    } catch (Exception $e) {
                        session()->flash('toast', [
                            'title' => 'Failed to save your changes.',
                            'description' => 'Something went wrong on our end. Please inform your administrators and try again later.',
                            'duration' => 5000,
                            'variant' => 'destructive'
                        ]);

                        return redirect()->back();
                    }
                },
            ],
            'pageState.pageData.photos' => 'required|array|min:1',
            'pageState.pageData.photos.*.photoID' => 'sometimes|nullable|integer|exists:organization_photos,photoID',
            'pageState.pageData.photos.*.orgID' => 'sometimes|required|integer|exists:organizations,orgID',
            'pageState.pageData.photos.*.caption' => 'sometimes|required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            session()->flash('toast', [
                'title' => 'Failed to save your changes.',
                'description' => 'One or more of your changes caused an error. Please check your changes and try again.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);

            return redirect()->back()
                ->withErrors($validator) // Flash the validation errors to the session
                ->withInput(); // Optionally flash the old input to the session
        }

        $changesMade = $request->input('changesMade');
        $organization = Organization::findOrFail($orgID);

        if (isset($changesMade) && $changesMade['all'] == true) {
            $changes = $request->input('changesMade')['changes'];
            $pageState = $request->input('pageState');

            // try {
            foreach ($changes as $key => $_) {
                switch ($key) {
                    case 'coverPhoto': {
                            // ignore if original file is default.jpeg | delete original file
                            // if (Organization::find($orgID)->coverPhoto !== 'default.jpeg' && Storage::exists('public/coverPhoto', Organization::find($orgID)->coverPhoto)) {
                            if (Organization::find($orgID)->coverPhoto !== 'default.jpeg') {
                                Storage::delete('public/coverPhoto/' . Organization::find($orgID)->coverPhoto);
                            }
                            // store new coverPhoto with new filename
                            $newFile = $request->file('changesMade.storage.coverPhoto'); // retrieve the file
                            $newFile_filename = uniqid() . '.' . $newFile->getClientOriginalExtension(); // set new unique name
                            $newFile->storeAs('public/coverPhoto', $newFile_filename); // store in storage
                            // change coverPhoto attribute of org in DB
                            $organization->coverPhoto = $newFile_filename;
                            break;
                        }
                    case 'logo': {
                            // ignore if original file is default.jpeg | delete original file
                            if (Organization::find($orgID)->logo !== 'default.jpeg'/* && Storage::exists('public/logo', Organization::find($orgID)->logo)*/) {
                                Storage::delete('public/logo/' . Organization::find($orgID)->logo);
                            }
                            // store new logo with new filename
                            $newFile = $request->file('changesMade.storage.logo'); // retrieve the file
                            $newFile_filename = uniqid() . '.' . $newFile->getClientOriginalExtension(); // set new unique name
                            $newFile->storeAs('public/logo', $newFile_filename); // store in storage
                            // change logo attribute of org in DB
                            $organization->logo = $newFile_filename;
                            break;
                        }
                    case 'keywords': {
                            $newRecords = [];
                            foreach ($pageState['pageLayoutData']['metadata']['keywords'] as $item) {
                                $newRecords[] = [
                                    'orgID' => $orgID,
                                    'keyID' => $item['keyID']
                                ];
                            }
                            // deletion
                            DB::table('organization_keywords')
                                ->where('orgID', $orgID)->delete();
                            // insertion
                            DB::table('organization_keywords')->insert($newRecords);
                            break;
                        };
                    case 'aboutUs': {
                            $organization->description = $request->input('pageState.pageData.aboutUs');
                            break;
                        }
                    case 'contacts': {
                            DB::table('organization_contacts')->where('orgID', $orgID)->delete();
                            // dd($pageState['pageData']['contacts']);
                            if (isset($pageState['pageData']['contacts'])) {
                                foreach ($pageState['pageData']['contacts'] as $index => $_) {
                                    $pageState['pageData']['contacts'][$index]['orgID'] = $orgID;
                                    unset($pageState['pageData']['contacts'][$index]['contactID']);
                                }
                                DB::table('organization_contacts')->insert($pageState['pageData']['contacts']);
                            }
                            break;
                        }
                    case 'officers': {
                            $newOfficersArray = $pageState['pageData']['officers'];
                            $oldOfficersArray = Officer::where('orgID', $orgID)->get()->toArray(); // before operations

                            // handle deletion
                            $missingOfficerIDs = array_diff(array_column($oldOfficersArray, 'officerID'), array_column($newOfficersArray, 'officerID'));
                            foreach ($missingOfficerIDs as $id) {
                                Officer::where(['orgID' => $orgID, 'officerID' => $id])->delete();
                            }

                            // check if all students are part of org
                            $orgMemberIDs = DB::table('organization_user_role')
                                ->where('orgID', $orgID)
                                ->select('userID')
                                ->get()
                                ->pluck('userID')
                                ->toArray();
                            $countDiffNewOfficersToOrgMembers = count(array_diff(array_column($newOfficersArray, 'userID'), $orgMemberIDs));
                            if ($countDiffNewOfficersToOrgMembers != 0) {
                                session()->flash('toast', [
                                    'title' => 'Failed to save your changes.',
                                    'description' => 'Possible data tampering detected. Please inform your administrators and try again later.',
                                    'duration' => 5000,
                                    'variant' => 'destructive'
                                ]);

                                return redirect()->back();
                            }

                            // handle insertion
                            foreach ($newOfficersArray as $index => $officer) {
                                // check if officerID is null
                                if ($officer['officerID'] === null) { // insert new record
                                    $newOfficerID = Officer::create([
                                        'orgID' => $orgID,
                                        'userID' => $officer['userID'],
                                        'position' => $officer['position']
                                    ])->officerID;
                                    $newOfficersArray[$index]['officerID'] = $newOfficerID;
                                }
                            }

                            // handle update/rearrange | covers both functionalities
                            $dbOfficers = Officer::where('orgID', $orgID)->get();
                            $count = 0;
                            foreach ($newOfficersArray as $officer) {
                                $dbOfficers[$count]->userID = $officer['userID'];
                                $dbOfficers[$count]->position = $officer['position'];
                                $dbOfficers[$count]->save();
                                ++$count;
                            }

                            break;
                        }
                    case 'social': {
                            $organization->fb_link = $request->input('pageState.pageData.fb_link');
                            break;
                        }
                    case 'photos': {
                            $newPhotoArray = $pageState['pageData']['photos'];
                            $storagePhotos = $request->file('changesMade.storage.photos');
                            $orgPhotos = Photo::where('orgID', $orgID)->get();
                            // checking if any photos are deleted
                            $orgPhotoIDs = $orgPhotos->pluck('photoID')->toArray();
                            $newPhotoIDs = array_column($newPhotoArray, 'photoID');
                            $missingPhotoIDs = array_diff($orgPhotoIDs, $newPhotoIDs);
                            if (!empty($missingPhotoIDs)) { // a photoID is missing from original (DB)
                                // remove deleted photos from storage. if default.jpeg, ignore.
                                $deletedPhotoFilenames = Photo::whereIn('photoID', $missingPhotoIDs)->get()->pluck('filename');
                                foreach ($deletedPhotoFilenames as $item) {
                                    if ($item !== 'default.jpeg') {
                                        Storage::delete('public/photo/' . $item);
                                    }
                                }
                                // delete rows not in the newPhotoArray
                                Photo::whereIn('photoID', $missingPhotoIDs)->delete();
                            }

                            foreach ($newPhotoArray as $index => $photo) {
                                // handle new rows
                                $origPhoto = Photo::find($photo['photoID']);
                                if ($photo['photoID'] === null) {
                                    // dump('new photo detected. Inserting:');
                                    $newFile = $storagePhotos[$index]; // retrieve the file
                                    $newFile_filename = uniqid() . '.' . $newFile->getClientOriginalExtension(); // set new unique name
                                    $newFile->storeAs('public/photo', $newFile_filename); // store in storage
                                    $newPhoto_id = Photo::create([
                                        'orgID' => $orgID,
                                        'caption' => $photo['caption'],
                                        'filename' => $newFile_filename,
                                    ])->photoID;

                                    $newPhotoArray[$index]['photoID'] = $newPhoto_id;
                                    $newPhotoArray[$index]['filename'] = $newFile_filename;
                                } else { // handle row update/s
                                    // handle caption change
                                    $tempNewName = '';
                                    if ($photo['caption'] !== $origPhoto->caption) {
                                        $origPhoto->caption = $photo['caption'];
                                        $origPhoto->save();
                                    }
                                    if ($photo['filename'] !== Storage::url('photo/' . $origPhoto->filename)) { // image file has changed
                                        // filename default.jpeg check is already enforced in validation
                                        // delete old photo in storage
                                        if ($origPhoto->filename !== 'default.jpeg') {
                                            Storage::delete('public/photo/' . $origPhoto->filename);
                                        }
                                        // generate new filename
                                        $newFile = $storagePhotos[$index]; // retrieve the file
                                        $newFile_filename = uniqid() . '.' . $newFile->getClientOriginalExtension(); // set new unique name
                                        $newFile->storeAs('public/photo', $newFile_filename); // store in storage
                                        // update Photo filename and save()
                                        $origPhoto->filename = $newFile_filename;
                                        $tempNewName = $newFile_filename;
                                        $origPhoto->save();
                                    } else {
                                        $tempNewName = $origPhoto->filename;
                                    }
                                    $newPhotoArray[$index]['filename'] = $tempNewName;
                                }
                            }
                            // update all photos using $newPhotoArray
                            $origPhotos = Photo::where('orgID', $orgID)->get();
                            $count = 0;
                            foreach ($newPhotoArray as $photo) {
                                $origPhotos[$count]->caption = $photo['caption'];
                                $origPhotos[$count]->filename = $photo['filename'];
                                $origPhotos[$count]->save();
                                ++$count;
                            }
                            break;
                        }
                }
            }

            $organization->save();

            session()->flash('toast', [
                'title' => 'Page changes saved successfully.',
                'duration' => 2000,
                'variant' => 'success'
            ]);

            return Inertia::location(route('admin.editpage', [$orgID]));
            // } catch (Exception $e) {
            //     session()->flash('toast', [
            //         'title' => 'Failed to save your changes.',
            //         'description' => 'Something went wrong on our end. Please inform your administrators and try again later.',
            //         'duration' => 5000,
            //         'variant' => 'destructive'
            //     ]);

            //     return redirect()->back();
            // }
        } else {
            return redirect()->back();
        }
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
            $query->select('applicationID', 'formID', 'userID', 'userData', 'similarityScore', 'status', 'created_at')
                ->with('user:userID,firstname,lastname,email,college');
        }])
        ->get(['formID', 'formLayout', 'orgID']);

   
    $formsWithApplications = $formsWithApplications->map(function ($form) use ($orgID) {
        $form->applications = $form->applications->map(function ($application) use ($orgID) {

            $isMember = DB::table('organization_user_role')
                ->where('userID', $application->userID)
                ->where('orgID', $orgID)
                ->exists();
            
            $application->isMember = $isMember;
            return $application;
        });
        return $form;
    });

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
