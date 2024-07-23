<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PatientsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "bed_id"=> ['required'],
            "id_number"=> ['required'],
            "image"=> [Rule::requiredIf(fn()=>$this->method()==="POSt")],
            "full_name"=> ['required', 'string'],
            "father_name"=> ['required', 'string'],
            "grant_father_name"=> ['required', 'string'],
            "nid"=> ['required', 'string'],
            "dob"=> ['required', 'date'],
            "gender"=> ['required', 'string'],
            "age"=> ['required'],
            "current_address"=> ['required', 'string'],
            "permanent_address"=> ['required', 'string'],
            "martial_status"=> ['required', 'string'],
            "entry_date"=> ['required'],
            "r_full_name"=> ['required', 'string'],
            "r_father_name"=> ['required', 'string'],
            "r_grant_father_name"=> ['required', 'string'],
            "r_nid"=> ['required', 'string'],
            "r_phone_number"=> ['required', 'string'],
            "relationship"=> ['required', 'string'],
            "r_current_address"=> ['required', 'string'],
            "r_permanent_address"=> ['required', 'string'],
            "illness_duration"=> ['required', 'string'],
            "mental_state"=> ['required', 'string'],
            "period_id"=> ['required'],
            "per_day_fees"=> ['required'],
            "total_period_price"=> ['required'],
            "amount_by_alphabet"=> ['required'],
            "taken_items"=> ['required'],
            "take_item_date"=> ['required'],
            "take_item_person"=> ['required'],
            "due_amount"=> ['required'],
            "exited"=> ['required'],
        ];
    }
}
