<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class Patient extends Model
{
    use HasFactory, LogsActivity, CausesActivity;

    protected $guarded = [];
    protected $casts = [
        'status' => 'boolean'
    ];

    public function getActivitylogOptions(): LogOptions
        {
            return LogOptions::defaults()
                            ->logOnlyDirty()
                            ->logOnly(['*'])
                            ->useLogName('Patient')
                            ->dontSubmitEmptyLogs()
                            ->dontLogIfAttributesChangedOnly(['updated_at'])
                            ;
        }

    public function bed()
    {
        return $this->belongsTo(Bed::class);
    }
    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function attachments()
    {
        return $this->hasMany(PatientAttachment::class);
    }
}
