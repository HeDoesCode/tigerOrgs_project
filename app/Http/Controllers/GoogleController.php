<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;

use App\Models\User;

use Illuminate\Support\Facades\Auth;

use Exception;

class GoogleController extends Controller
{
    public function googlepage()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googlecallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Exception $e) {
            return redirect()->route('login')->with('error', 'There was an error logging in. Please try again.');
        }

        $registeredUser = User::where('email', $googleUser->email)->first();


        if ($registeredUser == null) {
            return redirect()->route('login')->with('error', 'You are not authorized to access this application.');
        }

        Auth::login($registeredUser);
        session()->flash('toast', 'test');
        return redirect()->intended('/');
    }
}
