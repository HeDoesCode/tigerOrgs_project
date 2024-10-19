<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function markAllAsRead()
    {
    // Mark all unread notifications as read for the authenticated user
    Auth::user()->unreadNotifications()->update(['read_at' => now()]);


    return response()->json(['message' => 'All notifications marked as read']);
}

public function fetch()
{
    // Fetch notifications for the authenticated user
    $user = Auth::user();

    // If the user is not authenticated, return an empty response
    if (!$user) {
        return response()->json(['notifications' => [], 'unreadCount' => 0]);
    }

    // Get notifications and unread count
    $notifications = $user->notifications; // Get all notifications
    $unreadCount = $user->unreadNotifications()->count(); // Count unread notifications

    return response()->json([
        'notifications' => $notifications,
        'unreadCount' => $unreadCount,
    ]);
}

}
