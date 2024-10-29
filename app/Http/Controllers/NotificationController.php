<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function markAllAsRead()
    {
   
    Auth::user()->unreadNotifications()->update(['read_at' => now()]);


    return response()->json(['message' => 'All notifications marked as read']);
}

public function fetch()
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['notifications' => [], 'unreadCount' => 0]);
    }

    $notifications = $user->notifications; 
    $unreadCount = $user->unreadNotifications()->count(); 

    return response()->json([
        'notifications' => $notifications,
        'unreadCount' => $unreadCount,
    ]);
}

public function updateStatus(Application $application, Request $request)
{
    $application->update(['status' => $request->status]);
    
    return response()->json(['message' => 'Application status updated']);
}

}
