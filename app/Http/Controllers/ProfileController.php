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

        $userID = Auth::user();

        $keywords = Keyword::pluck('keyword', 'keyID');
        // ... and parse into array of objects
        $keywordsArray = $keywords->map(function ($keyword, $keyID) {
            return [
                'keyID' => $keyID,
                'keyword' => $keyword,
            ];
        })->values()->toArray();


        $userKeywords = DB::table('user_keywords')
            // ->join('users', 'user_keywords.userID', '=', 'users.userID')
            ->join('keywords', 'user_keywords.keyID', '=', 'keywords.keyID')
            ->where('user_keywords.userID', Auth::id())
            ->select('user_keywords.userID', 'keywords.keyword')
            ->orderBy('keywords.keyword', 'asc')
            ->get();
        // ->toSql();
        // $userKeywords = $user->updateKeywords;
        // dd($userKeywords);
        return Inertia::render('Profile/Edit', [
            'user' => $userID,
            'keywords' => $keywordsArray,
            'userKeywords' => $userKeywords ?: null,
        ]);
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
