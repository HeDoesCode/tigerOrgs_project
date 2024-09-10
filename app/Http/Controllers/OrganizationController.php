<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Keyword;
use Inertia\Controller;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    public function browse(Request $request): Response
    {
        $query = Organization::query();
        $queryParameters = [];

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
        $departments = $query->distinct()
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

        // attach photos
        $organizations = $query->with('photos')
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
            ->select('organizations.name', 'roles.role_description', 'organizations.orgID', 'organizations.logo')
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->sortBy('name');

        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'departments' => $departments,
            'keywords' => $keywordsArray,
            'myMemberOrganizations' => $myMemberOrganizations ?: null,
            'queryParameters' => $queryParameters ?: null,
        ]);
    }

    public function visit($orgID)
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

        $pageLayoutData = [
            'orgID' => $organization->orgID,
            'logo' => $organization->logo,
            'coverPhoto' => $organization->cover,
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
        ];

        // dump($pageData);
        return Inertia::render('Organizations/Home', [
            'pageData' => $pageData,
            'pageLayoutData' => $pageLayoutData,
        ]);
    }
}
