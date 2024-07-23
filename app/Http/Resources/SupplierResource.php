<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => encrypt($this->id),
            'responsible' => $this->responsible,
            'supplier_name' => $this->supplier_name,
            'due_amount' => $this->due_amount,
            'total_amount' => $this->total_amount,
            'details' => $this->details,
            'updated_at' => $this->updated_at,
        ];
    }
}
