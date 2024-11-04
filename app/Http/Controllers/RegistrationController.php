<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        // dd($request->all());
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'userID' => 'required|string|max:255', // Adjust as necessary
            'email' => 'required|email|unique:users,email',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'section' => 'required|string|max:10', 
            'college' => 'required|string|max:255',
            'status' => 'required|string|max:255', 
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create a new user
        $user = User::create([
            'userID' => $request->userID,
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'middlename' => $request->middlename,
            'section' => $request->section,
            'college' => $request->college,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }
}

