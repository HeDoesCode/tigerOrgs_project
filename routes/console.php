<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::call(function() {
    $automation = DB::table('settings')
        ->where('name', "Automation")
        ->first();

    if ($automation->status) {
        $recruitmentDate = DB::table('settings')
            ->where('name', 'Recruitment')
            ->select('start_date', 'end_date', 'status')
            ->first();

        $currentStatus = $recruitmentDate->status;
        $newStatus = ($recruitmentDate->start_date <= now() && $recruitmentDate->end_date > now()) ? 1 : 0;

        if ($currentStatus !== $newStatus) {
            DB::table('settings')
                ->where('name', 'Recruitment')
                ->update(['status' => $newStatus]);
        }

        if(!$currentStatus) {
            DB::table('organizations')->update(['recruiting' => false]);
        }
    }
})->everyMinute()->name('recruitment_automation')->withoutOverlapping();

Schedule::call(function() {
    $automation = DB::table('settings')
        ->where('name', "Automation")
        ->first();

    if ($automation->status) {
        $manualRegDate = DB::table('settings')
            ->where('name', 'Manual Registration')
            ->select('start_date', 'end_date', 'status')
            ->first();

        $currentStatus = $manualRegDate->status;
        $newStatus = ($manualRegDate->start_date <= now() && $manualRegDate->end_date > now()) ? 1 : 0;

        if ($currentStatus !== $newStatus) {
            DB::table('settings')
                ->where('name', 'Manual Registration')
                ->update(['status' => $newStatus]);
        }
    }
})->everyMinute()->name('manualReg_automation')->withoutOverlapping();