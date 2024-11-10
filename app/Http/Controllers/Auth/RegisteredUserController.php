<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        if (!session()->has('socialiteUser')) {
            session()->flash('toast', [
                'title' => 'Request Expired',
                'description' => 'Please login again.',
            ]);

            return redirect()->route('login');
        }

        $affiliations = Organization::all()
            ->pluck('department') // Get all departments
            ->filter(function ($department) {
                return $department !== 'University Wide'; // Remove 'University Wide'
            })
            ->unique() // Ensure departments are unique
            ->sort() // Sort departments alphabetically
            ->values(); // Reindex the array to reset the keys

        Inertia::share('affiliations', $affiliations ?: []);

        $socialiteUser = session()->get('socialiteUser');

        return Inertia::render('Home', [
            'bgImage' => asset('src/background/vecteezy_yellow-background-yellow-abstract-background-light-yellow_37153092.jpg'),
            'tiger1' => asset('src/background/tiger1.png'),
            'tiger2' => asset('src/background/tiger2.png'),
            'authModal' => 'register',
            'user' => [
                'fullName' => $socialiteUser->user['given_name'] . " " . $socialiteUser->user['family_name'],
                'email' => $socialiteUser->email,
            ],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    // public function store(Request $request): RedirectResponse

    // store a fully qualified student
    public function store(Request $request): RedirectResponse
    {
        if (!session()->has('socialiteUser')) {
            session()->flash('toast', [
                'title' => 'Request Expired',
                'description' => 'Please login again.',
            ]);

            return redirect()->route('login');
        }

        $validatedData = $request->validate([
            'userID' => 'required|string|size:10',
            'middleName' => 'nullable|string|max:255',
            'college' => 'required|string|exists:organizations,department|not_in:University Wide',
            'section' => 'nullable|string|max:255',
        ], [
            'userID.required' => 'The Student ID is required.',
            'userID.string' => 'The Student ID must be a valid string.',
            'userID.size' => 'The Student ID must be exactly 10 characters.',
        ]);

        $socialiteUser = session()->pull('socialiteUser');
        $rememberMe = session()->pull('remember_me', false);

        $user = User::create([
            'userID' => $validatedData['userID'],
            'email' => $socialiteUser['email'],
            'firstname' => $socialiteUser['given_name'],
            'lastname' => $socialiteUser['family_name'],
            'middlename' => $validatedData['middleName'] ?: null,
            'section' => $validatedData['section'] ?: null,
            'remember_token' => $rememberMe ?: null,
            'status' => 'student',
            'college' => $validatedData['college'],
        ]);

        Auth::login($user);

        request()->session()->regenerate();

        session()->flash('toast', [
            'title' => 'Registration Success!',
            'description' => 'Welcome to TigerOrgs.',
        ]);
        return redirect()->intended('/');
    }
}
