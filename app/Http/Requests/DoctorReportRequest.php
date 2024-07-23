<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DoctorReportRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'details' => ['required', 'string'],
            'attachment' => ['required', 'string'],
        ];
    }
}
