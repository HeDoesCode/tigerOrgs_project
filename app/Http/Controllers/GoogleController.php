<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
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

    // Initialize firstname and lastname
    $firstname = '';
    $lastname = '';

    // Check if the name is provided and split it
    if (!empty($googleUser->name)) {
        $nameParts = explode(' ', $googleUser->name, 2); 
        $firstname = $nameParts[0]; 
        $lastname = isset($nameParts[1]) ? $nameParts[1] : '';
    }

    if (AuthBypassEnum::bypassCheck($googleUser->email)) {
        if (!User::where('email', $googleUser->email)->first()) {
            User::firstOrCreate(
                ['email' => $googleUser->email],
                [
                    'userID' => '0000000001', 
                    'firstname' => $firstname, 
                    'lastname' => $lastname, 
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
        return Inertia::render('Home', [
            'isLoggedIn' => false,
            'isNewUser' => true,
            'googleUser' => [
                'email' => $googleUser->email,
                'firstname' => $firstname, 
                'lastname' => $lastname, 
            ],
        ]);
    }

    Auth::login($registeredUser, session()->pull('remember_me', 'false'));
    return redirect()->intended('/');
}



public function register(Request $request)
{
    try {
        // Validate the incoming request
        $validatedData = $request->validate([
            'userID' => 'required|string|max:10',
            'section' => 'nullable|string',
            'email' => 'required|email|unique:users,email',  
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
            'errors' => $e->validator->errors(), // This will give structured validation errors
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Registration failed',
            'error' => $e->getMessage() // This will provide the actual error message
        ], 500);
    }
}


}
