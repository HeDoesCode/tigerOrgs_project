<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Officer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'officerID';
    protected $table = 'organization_officers';
    protected $fillable = [
        'orgID',
        'userID',
        'position',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'orgID', 'orgID');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userID', 'userID');
    }
}
