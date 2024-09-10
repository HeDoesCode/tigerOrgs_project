<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Controller;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function browse(): Response
    {
        $query = Organization::query();

        // handle search query
        if (request('search')) {
            $query->where(function ($query) {
                $searchTerm = '%' . request('search') . '%';
                $query->where('name', 'like', $searchTerm)
                    ->orWhere('department', 'like', $searchTerm);
            });
        }

        $departments = $query->distinct()
            ->pluck('department');

        // handle category filter
        if (request('category')) {
            $query->where('department', request('category'));
        }

        // attach photos
        $organizations = $query->with('photos')
            ->withCount('members')
            ->get();

        $queryParameters = [];
        if (request('search')) {
            $queryParameters['search'] = request('search');
        }
        if (request('category')) {
            $queryParameters['category'] = request('category');
        }

        // $keywords = Keyword::pluck('keyword', 'keyID');

        $keywords = Keyword::pluck('keyword', 'keyID');

        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();


        // dd(count($keywordsArray));

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
