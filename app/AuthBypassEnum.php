<?php

namespace App;

enum AuthBypassEnum: string
{
    public static function emails(): array
    {
        return [ // replace all with single email (OSA) on production
            // 'josephvictor.paduga.cics@ust.edu.ph',
            'test.email.cics@ust.edu.ph',
            // 'arvin.alkuino.cics@ust.edu.ph',
            'laurencearvin.arcilla.cics@ust.edu.ph',
            // 'ethanjohn.catacutan.cics@ust.edu.ph',
        ];
    }

    public static function bypassCheck(string $email): bool
    {
        return in_array($email, self::emails());
    }
}
