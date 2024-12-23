<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Organization extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'orgID';
    protected $fillable = [
        'name',
        'logo',
        'coverPhoto',
        'description',
        'fb_link',
        'visibility',
        'department',
    ];

    protected $casts = [
        'recruiting' => 'boolean',
        'visibility' => 'boolean',
    ];

    protected $appends = [
        'logoUrl',
        'coverPhotoUrl'
    ];

    // Relationships:

    public function members(): BelongsToMany
    {
        // return $this->belongsToMany(User::class, 'organization_user_role', 'orgID', 'userID');
        return $this->belongsToMany(User::class, 'organization_user_role', 'orgID', 'userID')
            ->withPivot('roleID')
            ->withTimestamps();
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'organization_followers', 'orgID', 'userID');
    }

    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(Keyword::class, 'organization_keywords', 'orgID', 'keyID');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class, 'orgID', 'orgID');
    }

    public function officers(): HasMany
    {
        return $this->hasMany(Officer::class, 'orgID', 'orgID');
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'orgID', 'orgID');
    }

    public function forms(): HasMany
    {
        return $this->hasMany(Form::class, 'orgID', 'orgID');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'orgID', 'orgID');
    }

    public function criteria(): HasMany
    {
        return $this->hasMany(Criteria::class, 'orgID', 'orgID');
    }

    public function getlogoUrlAttribute()
    {
        return (Storage::url('logo/' . $this->logo));
    }

    public function getcoverPhotoUrlAttribute()
    {
        return (Storage::url('logo/' . $this->coverPhoto));
    }
}
