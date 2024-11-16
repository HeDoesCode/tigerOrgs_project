<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Criteria extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $primaryKey = "criteriaID";
    protected $table = "criteria";

    protected $fillable = [
        'orgID',
        'name',
        'description',
        'prepared_data',
    ];
}
