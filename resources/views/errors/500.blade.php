@extends('errors::minimal')

@section('title', __('Server Error'))
@section('code', '500')
@section('message', __('An unexpected error occurred on our end. Please try again later'))
