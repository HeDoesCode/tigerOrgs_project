<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Controller;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function browse(): Response
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

        $keywords = Keyword::pluck('keyword', 'keyID');

        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();

        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'departments' => $departments,
            'keywords' => $keywordsArray,
            'myOrganizations' => '',
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
