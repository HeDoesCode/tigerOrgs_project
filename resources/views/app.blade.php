<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/ico" href={{ asset('favicon.ico') }}>

    <!-- Scripts -->
    @routes
    @viteReactRefresh

    @if (env('APP_ENV') === 'production')
        @vite(['resources/js/app.jsx'])
    @else
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @endif

    @inertiaHead
</head>

<body class="antialiased bg-[#EEEEEE] text-black quicksand font-normal">
    @inertia
</body>

</html>
