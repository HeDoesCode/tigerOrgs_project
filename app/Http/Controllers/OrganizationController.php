<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Form;
use App\Models\Officer;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Keyword;
use Inertia\Controller;
use App\Models\Organization;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class OrganizationController extends Controller
{
    public function getRecommendations(): Collection
    {
        return Organization::join('organization_keywords', 'organization_keywords.orgID', '=', 'organizations.orgID')
            ->join('user_keywords', 'organization_keywords.keyID', '=', 'user_keywords.keyID')
            ->leftJoin('organization_user_role', 'organizations.orgID', '=', 'organization_user_role.orgID')
            ->where('user_keywords.userID', Auth::id())
            ->where('organizations.visibility', 1)
            ->select(
                'organizations.recruiting',
                'organizations.logo',
                'organizations.name',
                'organizations.description',
                DB::raw('COUNT(organization_user_role.userID) as members_count'),
                'organizations.orgID'
            )
            ->groupBy(
                'organizations.recruiting',
                'organizations.logo',
                'organizations.name',
                'organizations.description',
                'organizations.orgID'
            )
            ->distinct()
            ->get()
            ->map(function ($organization) {
                $organization->photos = DB::table('organization_photos')
                    ->where('orgID', $organization->orgID)
                    ->select('*')->get()->map(function ($photo) {
                        $photo->filename = Storage::url('photo/' . $photo->filename);
                        return $photo;
                    });

                $organization->logo = Storage::url('logo/' . $organization->logo);
                return $organization;
            });
    }

    public function browse(Request $request): Response
    {
        // $this->getRecommendations();
        $query = Organization::query();
        $queryParameters = [];

        $recommendedOrganizations = [];
        if (!request()->all()) {
            $recommendedOrganizations = $this->getRecommendations();
        }

        // handle search query
        if (request('search')) {
            $query->where(function ($query) {
                $searchTerm = '%' . request('search') . '%';
                $query->where('name', 'like', $searchTerm)
                    ->orWhere('department', 'like', $searchTerm);
            });
            $queryParameters['search'] = request('search');
        }

        // show departments that are present in the current search query
        $departments = $query->orderBy('department', 'asc')->distinct()
            ->pluck('department');

        // handle keyword filter
        if ($keywordFilter = request('keyword_filter')) {
            $query->whereHas('keywords', function ($q) use ($keywordFilter) {
                $q->whereIn('keyword', $keywordFilter);
            });
            $queryParameters['keyword_filter'] = request('keyword_filter');
        }

        // handle category filter
        if (request('category')) {
            $query->where('department', request('category'));
            $queryParameters['category'] = request('category');
        }

        $organizations = $query
            ->where('visibility', 1)    // Only include visible organizations
            ->with('photos')             // Attach photos relationship
            ->withCount('members')       // Attach member count
            ->get()
            ->map(function ($organization) {
                // Map over each photo to modify its URL
                $organization->photos = $organization->photos->map(function ($photo) {
                    $photo->filename = Storage::url('photo/' . $photo->filename);
                    return $photo;
                });
                $organization->logo = Storage::url('logo/' . $organization->logo);
                return $organization;
            });

        // // get all available keywords
        $keywords = Keyword::join('organization_keywords', 'keywords.keyID', '=', 'organization_keywords.keyID')
            ->select('keywords.*')->distinct()->get();

        // get all organization this user is a member of
        $myMemberOrganizations = Organization::join('organization_user_role', 'organizations.orgID', '=', 'organization_user_role.orgID')
            ->join('roles', 'organization_user_role.roleID', '=', 'roles.roleID')
            ->where('organization_user_role.userID', Auth::id())
            ->select('organizations.name', 'roles.role_description', 'organizations.orgID', 'organizations.logo', 'organizations.visibility')
            // ->limit(10) // remove in production
            ->orderBy('organizations.name', 'asc')
            ->get()
            ->sortBy('name')
            ->map(
                function ($organization) {
                    $organization->logo = Storage::url('logo/' . $organization->logo);
                    return $organization;
                }
            );

        $isSuperAdmin = DB::table('organization_user_role')
            ->where('userID', Auth::id())
            ->where('roleID', 3)
            ->select('*')
            ->first();

        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'recommendedOrganizations' => $recommendedOrganizations,
            'departments' => $departments,
            'keywords' => $keywords,
            'isSuperAdmin' => $isSuperAdmin,
            'myMemberOrganizations' => $myMemberOrganizations ?: [],
            'queryParameters' => $queryParameters ?: null,
        ]);
    }

    public function visit($orgID)
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

        $followButton = !DB::table('organization_followers')
            ->where('userID', Auth::id())
            ->where('orgID', $orgID)
            ->exists();

        return Inertia::render('Organizations/Home', [
            'pageData' => $pageData,
            'pageLayoutData' => $this->getPageLayoutData($orgID),
            'withFollow' => $followButton, // values: 1(can follow), 0(cannot follow/is already following), no parameter(not displayed)
        ]);
    }

    public function apply(Request $request, $orgID, $formID)
    {
        $formLayout = Form::find($formID)->formLayout;


        $user = Auth::user();


        $alreadyAnswered = Application::where('formID', $formID)
            ->where('userID', $user->userID)
            ->exists();

        if ($alreadyAnswered) {
            session()->flash('toast', [
                'title' => "You already answered this form.",
                'description' => 'Please wait for the status of your application.',
            ]);

            return redirect()->back();
        }


        return Inertia::render('Organizations/Apply', [
            'pageLayoutData' => $this->getPageLayoutData($orgID),
            'formLayout' => $formLayout,
            'orgID' => $orgID,
            'formID' => $formID
        ]);
    }

    public function toggleFollow($orgID)
    {
        $following = DB::table('organization_followers')
            ->where('userID', Auth::id())
            ->where('orgID', $orgID)
            ->select('*')
            ->get();

        $organizationName = Organization::find($orgID)->name;

        if ($following->isNotEmpty()) { // User is following org
            DB::table('organization_followers')
                ->where('userID', Auth::id())
                ->where('orgID', $orgID)
                ->delete();

            session()->flash('toast', [
                'title' => "You unfollowed {$organizationName}!",
                'description' => 'You will no longer receive public notifications from this organization.',
                'duration' => 5000,
            ]);
        } else {  // User is not following org
            DB::table('organization_followers')->insert([
                'userID' => Auth::id(),
                'orgID' => $orgID,
            ]);

            session()->flash('toast', [
                'title' => "You are now following {$organizationName}!",
                'description' => 'You will now receive public notifications from this organization.',
                'variant' => 'success',
                'duration' => 5000,
            ]);
        }

        $this->visit($orgID);
    }

    public function process($orgID)
    {
        return Inertia::render('Organizations/Process', [
            'pageLayoutData' => $this->getPageLayoutData($orgID),
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

        $isInOrgHome = Route::currentRouteName() === 'organizations.home';

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
}
