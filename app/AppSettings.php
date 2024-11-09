<?php

namespace App;

use Illuminate\Support\Facades\DB;

/**
 * Class AppSettings
 *
 * This class contains various application settings.
 *
 * @package App
 */

class AppSettings
{
    /**
     * Check if manual registration is enabled.
     *
     * This method checks the 'settings' table to determine whether manual registration
     * is allowed, based on the 'Manual Registration' entry in the table.
     *
     * @return bool Returns true if manual registration is enabled, false otherwise.
     */
    public static function isManualRegistration(): bool
    {
        return (bool) DB::table('settings')->where('name', 'Manual Registration')->value('status');
    }
}
