<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory;

    protected $primaryKey = 'applicationID';
    
    protected $fillable = [
        'userID',
        'orgID',
        'formID',
        'userData',
        'similarityScore',
        'additionalInstructions',
        'status',
        'prepared_data',
    ];

    protected $casts = [
        'userData' => 'json',
        'similarityScore' => 'float',
        'status' => 'string',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'orgID', 'orgID');
    }

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class, 'formID', 'formID');
    }

    public function user(): BelongsTo
    {
    return $this->belongsTo(User::class, 'userID', 'userID');
    }
}
