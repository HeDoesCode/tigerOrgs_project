<?php

namespace App;

enum SuperadminEnum: string
{
    public static function emails(): array
    {
        return [ // replace all with single email (OSA) on deployment
            // 'josephvictor.paduga.cics@ust.edu.ph',
            // 'arvin.alkuino.cics@ust.edu.ph',
            'laurencearvin.arcilla.cics@ust.edu.ph',
            
            'ethanjohn.catacutan.cics@ust.edu.ph',
            'osastudentorganizations@ust.edu.ph'
        ];
    }

    public static function check(string $email): bool
    {
        return in_array($email, self::emails());
    }
}
