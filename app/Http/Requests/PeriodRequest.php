<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PeriodRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'description' => ['nullable', 'string', 'min:1', 'max:150'],
            'id_number' => ['required', 'string', 'min:1', 'max:150'],
            'name' => ['required', 'string', 'min:1', 'max:150'],
        ];
    }
}
