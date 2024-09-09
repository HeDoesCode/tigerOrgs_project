<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'contactID';
    protected $table = 'organization_contacts';
    protected $fillable = [
        'orgID',
        'platform',
        'name',
        'address',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'orgID', 'orgID');
    }
}
