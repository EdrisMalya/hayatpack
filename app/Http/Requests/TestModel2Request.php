<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestModel2Request extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
        ];
    }
}
