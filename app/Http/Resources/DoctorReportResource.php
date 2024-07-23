<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DoctorReportResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'details' => $this->details,
            'user' => $this->user,
            'attachment' => asset('storage/'.$this->attachment_path),
        ];
    }
}
