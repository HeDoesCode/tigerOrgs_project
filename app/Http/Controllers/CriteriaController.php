<?php

namespace App\Http\Controllers;

use App\Jobs\PrepareCriteriaData;
use App\Models\Criteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CriteriaController extends Controller
{
    // GET: get all and display criteria
    public function index($orgID)
    {
        $allCriteria = Criteria::where('orgID', $orgID)->get()->toArray();

        return Inertia::render('Admin/AdminManageCriteria/Index', ['orgID' => $orgID, 'criteriaData' => $allCriteria]);
    }

    // GET: display create form
    public function create($orgID)
    {
        return Inertia::render('Admin/AdminManageCriteria/Create', ['orgID' => $orgID]);
    }

    // POST: create new criteria
    public function store(Request $request, $orgID)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:4294967295']
        ]);

        $createdCriteria = Criteria::create([
            'orgID' => $orgID,
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        // prepare data in the background
        PrepareCriteriaData::dispatch($createdCriteria->criteriaID);

        session()->flash('toast', [
            'title' => 'Criteria was successfully created!',
            'description' => '',
            'variant' => 'success'
        ]);

        return redirect()->route('admin.criteria.index', ['orgID' => $orgID]);
    }

    // GET: get specific criteria and display in edit form
    public function edit($orgID, $criterion)
    {
        $editedCriteria = Criteria::find($criterion);

        return Inertia::render('Admin/AdminManageCriteria/Edit', ['orgID' => $orgID, 'criteriaData' => $editedCriteria]);
    }

    // PUT: update criteria
    public function update(Request $request, $orgID, $criterion)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string']
        ]);

        $editedCriteria = Criteria::find($criterion);
        $editedCriteria->name = $validatedData['name'];
        $editedCriteria->description = $validatedData['description'];
        $editedCriteria->save();

        PrepareCriteriaData::dispatch($editedCriteria->criteriaID);

        session()->flash('toast', [
            'title' => 'Criteria was successfully updated!',
            'description' => '',
            'variant' => 'success'
        ]);

        return redirect()->route('admin.criteria.index', ['orgID' => $orgID]);
    }

    // DELETE: delete criteria
    public function destroy($orgID, $criterion)
    {
        $deletedCriteria = Criteria::find($criterion);

        $deletedCriteria->delete();

        session()->flash('toast', [
            'title' => 'Criteria was successfully deleted!',
            'description' => '',
            'variant' => 'success'
        ]);
    }
}
