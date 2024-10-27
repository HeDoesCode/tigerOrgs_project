<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CriteriaController extends Controller
{
    public function index($orgID)
    {
        $organization = Organization::findOrFail($orgID);

        return Inertia::render('Admin/AdminManageCriteria', [$orgID => $organization->orgID]);
    }

    public function store()
    {}

    public function create()
    {}

    public function show()
    {}
    
    public function update()
    {}

    public function destroy()
    {}
}
