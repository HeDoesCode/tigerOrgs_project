<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit()
    {

        $user = Auth::user();

        $keywords = Keyword::pluck('keyword', 'keyID');
        // ... and parse into array of objects
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

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'keywords' => $keywordsArray,
            'activeUserKeywords' => $activeUserKeywords,
        ]);
    }

    public function updateUserKeywords(Request $request)
    {
        $validatedData = $request->validate([
            'activeKeywords' => 'nullable|array',
            'activeKeywords.*.keyID' => 'required|numeric|exists:keywords,keyID',
            'activeKeywords.*.keyword' => 'required|string|max:255',
        ]);

        // $newKeywords = $validatedData['activeKeywords'];

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

    public function updateKeywords(Request $request)
    {
        //
    }


















































    // /**
    //  * Update the user's profile information.
    //  */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }

    // /**
    //  * Delete the user's account.
    //  */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }

}
