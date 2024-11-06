<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;
use App\AuthBypassEnum;
use Illuminate\Support\Facades\DB;

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
        $googleUser = Socialite::driver('google')->stateless()->user();

        //for superadmin
        if (AuthBypassEnum::bypassCheck($googleUser->email)) {
            if (!User::where('email', $googleUser->email)->first()) {
                User::firstOrCreate(
                    ['email' => $googleUser->email],
                    [
                        'userID' => '0000000001', 
                        'firstname' => $googleUser->user['given_name'], 
                        'lastname' => $googleUser->user['family_name'], 
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


        $ManualReg = DB::table('settings')->where('id', 2)->value('status');

        if ($registeredUser == null && $ManualReg === 0 ) {
            return abort(403, 'Only currently registered/enrolled students of the University of Santo Tomas can use this application.');
        }else if ($registeredUser == null && $ManualReg === 1) {
            return Inertia::render('Home', [
                'bgImage' => asset('src/background/vecteezy_yellow-background-yellow-abstract-background-light-yellow_37153092.jpg'),
                'tiger1' => asset('src/background/tiger1.png'),
                'tiger2' => asset('src/background/tiger2.png'),
                'isLoggedIn' => false,
                'isNewUser' => true,
                'googleUser' => [
                    'email' => $googleUser->email,
                    'firstname' => $googleUser->user['given_name'], 
                    'lastname' => $googleUser->user['family_name'], 
                ],
            ]);
        }else{
            Auth::login($registeredUser, session()->pull('remember_me', 'false'));
            return redirect()->intended('/');
        }
        
    } catch (Exception $e) {
        session()->flash('toast', [
            'title' => 'Login Error',
            'description' => 'There was an error logging in. Please try again later.',
            'duration' => 5000,
            'variant' => 'destructive'
        ]);
        return redirect()->route('login');
    }
}


public function register(Request $request)
{
    try {
        // Validate the incoming request
        $validatedData = $request->validate([
            'userID' => 'required|string|max:10',
            'section' => 'nullable|string',
            'email' => 'required|email',  // Removed unique constraint since we're using updateOrCreate
            'college' => 'required|string',
            'firstname' => 'required|string', 
            'lastname' => 'required|string' 
        ]);
        
        $user = User::updateOrCreate(
            ['email' => $validatedData['email']], 
            [
                'userID' => $validatedData['userID'],
                'section' => $validatedData['section'],
                'college' => $validatedData['college'],
                'status' => 'student', 
                'firstname' => $validatedData['firstname'], 
                'lastname' => $validatedData['lastname'] 
            ]
        );

    } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors with a proper structure
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->validator->errors(), 
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Registration failed',
            'error' => $e->getMessage() 
        ], 500);
    }

    }


}
