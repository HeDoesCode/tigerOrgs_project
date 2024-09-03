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
        $organizations = Organization::with('photos')
            ->withCount('members')
            ->get();
        $keywords = Keyword::all();
        // dd($organizations);
        return Inertia::render('Organizations/Organizations', [
            'organizations' => $organizations,
            'keywords' => $keywords,
        ]);
    }
}
