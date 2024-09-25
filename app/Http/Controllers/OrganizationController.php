<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Keyword;
use Inertia\Controller;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OrganizationController extends Controller
{
    public function getRecommendations(): Collection
    {
        return DB::table('organization_keywords')
            ->join('user_keywords', 'organization_keywords.keyID', '=', 'user_keywords.keyID')
            ->join('organizations', 'organization_keywords.orgID', '=', 'organizations.orgID')
            ->leftJoin('organization_user_role', 'organizations.orgID', '=', 'organization_user_role.orgID') // Consider a left join to include organizations with 0 members
            ->where('user_keywords.userID', '=', Auth::id())
            ->select(
                'organizations.logo',
                'organizations.name',
                'organizations.description',
                DB::raw('COUNT(organization_user_role.userID) as members_count'),
                'organizations.orgID'
            )
            ->groupBy(
                'organizations.logo',
                'organizations.name',
                'organizations.description',
                'organizations.orgID'
            )
            ->distinct()
            ->get()
            ->map(function ($organization) {
                $organization->photos = DB::table('organization_photos')
                    ->where('orgID', '=', $organization->orgID)
                    ->select('*')->get();
                return $organization;
            });
    }

    public function browse(Request $request): Response
    {
        $this->getRecommendations();
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
            // only visible orgs included
            ->where('visibility', 1)
            // attach photos
            ->with('photos')
            ->withCount('members')
            ->get();

        // get all available keywords
        $keywords = Keyword::pluck('keyword', 'keyID');
        // ... and parse into array of objects
        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();

        // get all organization this user is a member of
        $myMemberOrganizations = DB::table('organization_user_role')
            ->join('roles', 'organization_user_role.roleID', '=', 'roles.roleID')
            ->join('organizations', 'organization_user_role.orgID', '=', 'organizations.orgID')
            ->where('organization_user_role.userID', Auth::id())
            ->select('organizations.name', 'roles.role_description', 'organizations.orgID', 'organizations.logo')
            // ->limit(10) // remove in production
            ->orderBy('organizations.name', 'asc')
            ->get()
            ->sortBy('name');

        // dd($myMemberOrganizations);

        $isSuperAdmin = DB::table('organization_user_role')
            ->where('userID', Auth::id())
            ->where('roleID', 3)
            ->select('*')
            ->first();

        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'recommendedOrganizations' => $recommendedOrganizations,
            'departments' => $departments,
            'keywords' => $keywordsArray,
            'isSuperAdmin' => $isSuperAdmin,
            // 'isSuperAdmin' => true,
            'myMemberOrganizations' => $myMemberOrganizations ?: [],
            'queryParameters' => $queryParameters ?: null,
        ]);
    }

    public function visit($orgID)
    {
        $organization = Organization::withCount('members')
            ->with('officers.user')
            ->with('contacts')
            ->findOrFail($orgID);
        // try {

        // }
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
        //     'orgID' => $organization->orgID,
        //     'logo' => $organization->logo,
        //     'coverPhoto' => $organization->cover,
        //     'metadata' => [
        //         'organizationName' => $organization->name,
        //         'members' => $organization->members_count,
        //     ],
        // ];

        // dump($pageData);

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

    public function toggleFollow($orgID)
    {
        $following = DB::table('organization_followers')
            ->where('userID', Auth::id())
            ->where('orgID', $orgID)
            ->select('*')
            ->get();

        $organizationName = Organization::find($orgID)->value('name');

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

    public function getPageLayoutData($orgID)
    {
        $organization = Organization::withCount('members')
            ->findOrFail($orgID);
        return [
            'orgID' => $organization->orgID,
            'logo' => Storage::url("public/logos/".$organization->logo),
            'coverPhoto' => Storage::url("public/covers/".$organization->cover),
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            // 'recruiting' => $organization->recruiting,
            'recruiting' => 1,
        ];
    }
}
