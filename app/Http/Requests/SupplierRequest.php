<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'details' => ['required', 'string', 'min:1', 'max:150'],
            'due_amount' => ['required'],
            'responsible' => ['required', 'string', 'min:1', 'max:150'],
            'supplier_name' => ['required', 'string', 'min:1', 'max:150'],
            'total_amount' => ['required'],
        ];
    }
}
