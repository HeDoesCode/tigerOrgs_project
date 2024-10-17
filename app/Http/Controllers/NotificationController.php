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
}
