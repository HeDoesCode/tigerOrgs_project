<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public $timestamps = false;
    public $incrementing = false;

    protected $primaryKey = 'userID';
    protected $fillable = [
        'userID',
        'email',
        'firstname',
        'lastname',
        'middlename',
        'section',
        'college',
        'status',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            // Convert fields to uppercase if they exist
            if ($user->firstname) {
                $user->firstname = strtoupper($user->firstname);
            }
            if ($user->lastname) {
                $user->lastname = strtoupper($user->lastname);
            }
            if ($user->middlename) {
                $user->middlename = strtoupper($user->middlename);
            }
            if ($user->section) {
                $user->section = strtoupper($user->section);
            }
        });
    }

    public function roles(): BelongsToMany
    {
        // return $this->belongsToMany(Role::class, 'user_roles', 'userID', 'roleID');
        return $this->belongsToMany(Role::class, 'organization_user_role', 'roleID', 'userID')
            ->withPivot('orgID')
            ->withTimestamps();
    }

    public function organizations(): BelongsToMany
    {
        // return $this->belongsToMany(Role::class, 'user_roles', 'userID', 'roleID');
        return $this->belongsToMany(Organization::class, 'organization_user_role', 'userID', 'orgID')
            ->withPivot('orgID')
            ->withTimestamps();
    }

    // public function memberOf(): BelongsToMany
    // {
    //     return $this->belongsToMany(Organization::class, 'organization_members', 'userID', 'orgID');
    // }

    public function follows(): BelongsToMany
    {
        return $this->belongsToMany(Organization::class, 'organization_followers', 'userID', 'orgID');
    }

    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(Keyword::class, 'user_keywords', 'userID', 'keyID');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'userID', 'userID');
    }


    protected $hidden = [
        // 'password',
        'remember_token',
    ];

    // protected function casts(): array
    // {
    //     return [
    //         'email_verified_at' => 'datetime',
    //         'password' => 'hashed',
    //     ];
    // }
}
