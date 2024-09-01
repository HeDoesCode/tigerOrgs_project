<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'orgID';
    protected $fillable = [
        'name',
        'logo',
        'cover',
        'description',
        'fb_link',
        'visibility',
        'department',
    ];

    public function members() : BelongsToMany {
        return $this->belongsToMany(User::class, 'organization_members', 'orgID', 'userID');
    }

    public function followers() : BelongsToMany {
        return $this->belongsToMany(User::class, 'organization_followers', 'orgID', 'userID');
    }

    public function keywords() : BelongsToMany {
        return $this->belongsToMany(Keyword::class, 'organization_keywords', 'orgID', 'keyID');
    }

    public function photos() : HasMany {
        return $this->hasMany(Photo::class, 'orgID', 'orgID');
    }
    
    public function forms() : HasMany {
        return $this->hasMany(Form::class, 'orgID', 'orgID');
    }
}