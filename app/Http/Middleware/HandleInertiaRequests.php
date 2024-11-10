<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        // session()->flash('toast', [
        //     'title' => 'oh no',
        //     'description' => 'ang daming bugs pare :(', // optional. default: title only
        //     'variant' => 'destructive' // optional. default: white bg
        //     'duration' => '5000' // optional. default: 4000
        // ]);

        return array_merge(
            parent::share($request),
            [
                'flash' => [
                    'toast' => session()->get('toast'),
                ],
                'auth' => [
                    'user' => $request->user(),
                ],

                'unreadNotificationsCount' => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
                'notifications' => $request->user() ? $request->user()->notifications()->get() : [],
                'applications' => $request->user() ? $request->user()->applications()->with(['organization', 'form'])->latest()->get() : []
            ]
        );
    }
}
