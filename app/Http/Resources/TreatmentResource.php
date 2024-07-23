<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TreatmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => encrypt($this->id),
            'id_number' => $this->id_number,
            'description' => $this->description,
            'name' => $this->name,
            'updated_at' => $this->updated_at,
        ];
    }
}
