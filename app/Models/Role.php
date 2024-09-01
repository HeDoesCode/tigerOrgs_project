<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'roleID';
    protected $fillable = [
        'role_description',
    ];

    public function users() : BelongsToMany {
        return $this->belongsToMany(User::class, 'user_roles', 'roleID', 'userID');
    }
}