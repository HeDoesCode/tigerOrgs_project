@extends('errors::minimal')

@section('title', __('Page Expired'))
@section('code', '419')
@section('message', __('Your session has timed out. Please reload the page to continue'))
@section('action')
    <button onclick="window.location.reload()"
        class="px-4 py-2 bg-black text-white rounded-xl hover:bg-black/70 flex gap-x-2">
        {{-- <span class="whitespace-nowrap"> --}}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
        </svg>
        <span>{{ __('Reload Page') }}</span>
        {{-- </span> --}}
    </button>
@endsection
