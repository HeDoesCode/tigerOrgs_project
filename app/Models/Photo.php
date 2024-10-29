<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Photo extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'photoID';
    protected $table = 'organization_photos';
    protected $fillable = [
        'orgID',
        'filename',
        'caption'
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'orgID', 'orgID');
    }
}
