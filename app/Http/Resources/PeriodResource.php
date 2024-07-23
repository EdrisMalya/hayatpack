<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PeriodResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => encrypt($this->id),
            'id_number' => $this->id_number,
            'name' => $this->name,
            'description' => $this->description,
            'updated_at' => $this->updated_at,
        ];
    }
}
