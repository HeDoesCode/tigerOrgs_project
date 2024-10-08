@extends('errors::minimal')

@section('title', __('Unauthorized'))
@section('code', '401')
@section('message', __($exception->getMessage() ?: 'Unauthorized access. Please log in and try again.'))
