<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\AuthBypassEnum;

class GoogleController extends Controller
{
    public function googlepage()
    {
        session()->put('remember_me', request('remember_me'));
        return Socialite::driver('google')->redirect();
    }

    public function googlecallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Exception $e) {
            session()->flash('toast', [
                'title' => 'Login Error',
                'description' => 'There was an error logging in. Please try again later.',
                'duration' => 5000,
                'variant' => 'destructive'
            ]);
            return redirect()->route('login');
        }

        if (AuthBypassEnum::bypassCheck($googleUser->email)) {
            if (!User::where('email', $googleUser->email)->first()) {
                // User::create([
                //     'userID' => '0000000001',
                //     'email' => $googleUser->email,
                //     'firstname' => 'OSA',
                //     'lastname' => 'admin',
                //     'status' => 'osa',
                //     'college' => 'osa'
                // ]);

                // need to update this logic if multiple superadmins supported
                User::firstOrCreate(
                    ['userID' => 0000000001],
                    [
                        'email' => $googleUser->email,
                        'firstname' => 'OSA',
                        'lastname' => 'admin',
                        'status' => 'osa',
                        'college' => 'osa'
                    ]
                );
            }
            Auth::login(
                User::where('email', $googleUser->email)->first(),
                session()->pull('remember_me', 'false')
            );
            return redirect('superadmin');
        }

        $registeredUser = User::where('email', $googleUser->email)->first();

        if ($registeredUser == null) {
            return abort(403, 'Only currently registered/enrolled students of the University of Santo Tomas can use this application.');
        }
        Auth::login($registeredUser, session()->pull('remember_me', 'false'));
        return redirect()->intended('/');
    }
}
