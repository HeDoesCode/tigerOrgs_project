<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;     

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
    ];
}