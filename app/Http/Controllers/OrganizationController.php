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
            $query->where('name', 'like', '%' . request('search') . '%');
        }

        $departments = $query->distinct()
            ->pluck('department');

        // handle category filter
        if (request('category')) {
            // $query->where('name', 'like', '%' . request('search') . '%');
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


        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'departments' => $departments,
            'queryParameters' => $queryParameters ?: null,
        ]);
    }

    public function visit($orgID)
    {
        $organization = Organization::withCount('members')->find($orgID);
        $pageData = [
            'logo' => $organization->logo,
            'coverPhoto' => $organization->cover,
            'metadata' => [
                'organizationName' => $organization->name,
                'members' => $organization->members_count,
            ],
            'aboutUs' => $organization->description,
            'contacts' => [
                // hard-coded for now
                [
                    'platform' => "email",
                    'address' => "site.cics@ust.edu.ph",
                ],
                [
                    'platform' => "facebook",
                    'address' => "https://www.facebook.com/site.ust",
                ],
                [
                    'platform' => "instagram",
                    'address' => "https://www.instagram.com/site.ust",
                ],
                [
                    'platform' => "x",
                    'address' => "https://www.x.com/site.ust",
                ],
            ],
            'officers' => [
                [
                    'position' => "President",
                    'name' => "John Doe",
                ],
                [
                    'position' => "Vice President",
                    'name' => "Jane Smith",
                ],
                [
                    'position' => "Secretary",
                    'name' => "Alex Johnson",
                ],
                [
                    'position' => "Treasurer",
                    'name' => "Emily Davis",
                ],
                [
                    'position' => "Auditor",
                    'name' => "Michael Brown",
                ],
                [
                    'position' => "PRO",
                    'name' => "Sarah Lee",
                ],
            ],
            'photos' => $organization->photos,
        ];

        // dump($pageData);
        return Inertia::render('Organizations/Home', [
            'pageData' => $pageData,
        ]);
    }
}
