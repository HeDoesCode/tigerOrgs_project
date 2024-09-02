<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Form extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $primaryKey = 'formID';
    protected $fillable = [
        'orgID',
        'formLayout',
    ];
    
    public function forms() : BelongsTo {
        return $this->belongsTo(Organization::class, 'orgID', 'orgID');
    }
}
