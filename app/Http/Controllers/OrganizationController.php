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
}
