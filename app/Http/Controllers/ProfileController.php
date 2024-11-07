<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Keyword;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function edit()
    {
        $user = Auth::user();

        $keywords = Keyword::pluck('keyword', 'keyID');
        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();


        $activeUserKeywords = DB::table('user_keywords')
            ->join('keywords', 'user_keywords.keyID', '=', 'keywords.keyID')
            ->where('user_keywords.userID', Auth::id())
            ->select('user_keywords.keyID', 'keywords.keyword')
            ->orderBy('keywords.keyword', 'asc')
            ->get()
            ->toArray();

        $followedOrgIDs = Organization::join('organization_followers', 'organization_followers.orgID', 'organizations.orgID')
            ->where('userID', Auth::id())->select('organizations.orgID', 'organizations.name', 'organizations.logo')->get()->toArray();

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'keywords' => $keywordsArray,
            'activeUserKeywords' => $activeUserKeywords,
            'followedOrgs' => $followedOrgIDs,
        ]);
    }

    public function updateUserKeywords(Request $request)
    {
        $validatedData = $request->validate([
            'activeKeywords' => 'nullable|array',
            'activeKeywords.*.keyID' => 'required|numeric|exists:keywords,keyID',
            'activeKeywords.*.keyword' => 'required|string|max:255',
        ]);

        $user = User::where('userID', Auth::id())->first();

        $newKeywords = [];
        if (!empty($validatedData['activeKeywords'])) {
            foreach ($validatedData['activeKeywords'] as $keyword) {
                $newKeywords[$keyword['keyID']] = [];
            }
        }

        try {
            $user->keywords()->sync($newKeywords);
            session()->flash('toast', [
                'title' => 'Keyword Update Successful',
                // 'description' => "$queryResult",
                'variant' => 'success',
                'duration' => 2000,
            ]);
        } catch (\Exception $e) {
            session()->flash('toast', [
                'title' => 'Keyword Update Failed',
                'description' => "An error occurred while updating keywords.",
                'variant' => 'destructive',
                'duration' => 2000,
            ]);
        }

        $this->edit();
    }

    public function updateUserSection(Request $request)
    {
        $request->merge([
            'section' => strtoupper($request->input('section'))
        ]);

        $validator = Validator::make($request->all(), [
            // 'section' => ['required', 'regex:/^\d-[A-Z]+$/'],
            'section' => ['required'],
        ]);

        if ($validator->fails()) {
            session()->flash('toast', [
                'title' => 'Section Update Failed',
                'description' => "Please follow the correct format: [YEAR]-[SECTION] ex. 3-ITG.",
                'variant' => 'destructive',
                'duration' => 5000,
            ]);
            return null;
        }

        $user = User::where('userID', Auth::id())->first();

        $user->section = $request->input('section') ?: null;

        $user->save();

        if ($user->save()) {
            session()->flash('toast', [
                'title' => 'Section Update Successful',
                'variant' => 'success',
                'duration' => 2000,
            ]);
        } else {
            session()->flash('toast', [
                'title' => 'Section Update Failed',
                'description' => "An error occurred while updating your section.",
                'variant' => 'destructive',
                'duration' => 2000,
            ]);
        }

        $this->edit();
    }

    public function updateUserFollows(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'unfollowedOrgIDs' => 'array',
            'unfollowedOrgIDs.*' => 'integer',
        ]);

        if ($validator->fails()) {
            session()->flash('toast', [
                'title' => 'Unfollow Organizations Failed',
                'description' => "An error occurred while updating your followed organizations.",
                'variant' => 'destructive',
                'duration' => 4000,
            ]);
            return redirect()->back();
        };

        $unfollowedOrgIDs = $request->all();

        $results = DB::table('organization_followers')->where('userID', Auth::id())
            ->whereIn('orgID', $unfollowedOrgIDs);

        if ($results->get()->count() !== count($unfollowedOrgIDs)) {
            abort(400);
        }

        $results->delete();

        session()->flash('toast', [
            'title' => 'Unfollow Organizations Success',
            'description' => "Successfully unfollowed organization/s.",
            'variant' => 'success',
            'duration' => 3000,
        ]);

        return redirect()->back();
    }
}
