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
        // Bypass Socialite login in development mode
        if (app()->isLocal()) {
            $registeredUser = User::find('2024000004');

            if (!$registeredUser) {
                return abort(403, 'User not found.');
            }

            Auth::login($registeredUser, session()->pull('remember_me', 'false'));
            return redirect()->intended('/');
        }

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Login Error',
                'description' => 'There was an error logging in. Please try again later.',
                'duration' => 2000,
                'variant' => 'destructive'
            ]);
            return redirect()->route('login');
        }

        $registeredUser = User::where('email', $googleUser->email)->first();

        if ($registeredUser == null) {
            return abort(403, 'Only enrolled students of the University of Santo Tomas can use this application.');
        }

        Auth::login($registeredUser, session()->pull('remember_me', 'false'));
        return redirect()->intended('/');
    }
}
