<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BedResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => encrypt($this->id),
            'description' => $this->description,
            'id_number' => $this->id_number,
            'name' => $this->name,
            'room' => $this->room,
            'updated_at' => $this->updated_at,
        ];
    }
}
