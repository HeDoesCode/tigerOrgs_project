<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Keyword extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $primaryKey = 'keyID';
    protected $fillable = [
        'keyword',
    ];

    public function users() : BelongsToMany {
        return $this->belongsToMany(User::class, 'user_keywords', 'keyID', 'userID');
    }

    public function organizations() : BelongsToMany {
        return $this->belongsToMany(Organization::class, 'organization_keywords', 'keyID', 'orgID');
    }
}
