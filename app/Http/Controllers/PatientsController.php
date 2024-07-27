<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\PatientsRequest;
use App\Http\Resources\PatientsResource;
use App\Models\Bed;
use App\Models\Patient;
use App\Models\PatientAttachment;
use App\Models\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PatientsController extends Controller
{
    public function index(Request $request)
    {
        $search_params = [
            "bed_id",
            "id_number",
            "image",
            "full_name",
            "father_name",
            "grant_father_name",
            "nid",
            "dob",
            "gender",
            "age",
            "current_address",
            "permanent_address",
            "martial_status",
            "entry_date",
            "r_full_name",
            "r_father_name",
            "r_grant_father_name",
            "r_nid",
            "r_phone_number",
            "relationship",
            "r_current_address",
            "r_permanent_address",
            "illness_duration",
            "mental_state",
            "period_id",
            "per_day_fees",
            "total_period_price",
            "amount_by_alphabet",
            "taken_items",
            "take_item_date",
            "take_item_person",
            "due_amount",
        ];
        $query = Patient::query()->with(['bed', 'attachments']);
        if($request->get('from_date') && $request->get('to_date')) {
            $query = $query->whereBetween('created_at', [$request->get('from_date'), $request->get('to_date')]);
        }
        if($request->has('bed')){
            $query = $query->where('bed_id', $request->get('bed')['value']);
        }
        if($request->has('period')){
            $query = $query->where('period_id', $request->get('period')['value']);
        }
        if($request->has('gender')){
            $query = $query->where('gender', $request->get('gender'));
        }
        if($request->has('martial_status')){
            $query = $query->where('martial_status', $request->get('martial_status'));
        }
        if($request->has('show_due') && $request->get('show_due')){
            $query = $query->where('due_amount', '>', 0);
        }
        if($request->has('exited') && $request->get('exited')){
            $query = $query->where('exited', true);
        }
        if($request->has('status') && $request->get('status')){
            $query = $query->where('status', 0);
        }else{
            $query = $query->where('status', true);
        }
        $datatable = new DatatableBuilder($query, $request, $search_params);

        return Inertia::render('Patients/PatientsIndex', [
            'patients' => PatientsResource::collection($datatable->build()),
            'filters' => [
                'from_date' => \request()->get('from_date'),
                'to_date' => \request()->get('to_date'),
                'bed' => \request()->get('bed'),
                'period' => \request()->get('period'),
                'gender' => \request()->get('gender'),
                'martial_status' => \request()->get('martial_status'),
                'show_due' => \request()->get('show_due'),
                'exited' => \request()->get('exited'),
                'status' => (boolean)\request()->get('status'),
            ],
            'beds' => Bed::all(),
            'periods' => Period::all(),
        ]);
    }
    public function create(){
        return Inertia::render('Patients/PatientForm', [
            'beds' => Bed::all(),
            'periods' => Period::all(),
        ]);
    }

    public function store($lang, PatientsRequest $patientsRequest)
    {
        $data = $patientsRequest->validated();
        unset($data['image']);
        $data['image'] = asset('storage/'.$patientsRequest->file('image')->store('patient_images', 'public'));
        Patient::query()->create($data);
        return Redirect::route('patient.index', ['lang'=>$lang])->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }

    public function edit($lang, Patient $patient)
    {
        return Inertia::render('Patients/PatientForm', [
            'beds' => Bed::all(),
            'periods' => Period::all(),
            'patient' => $patient->load(['bed', 'period']),
        ]);
    }

    public function update($lang, PatientsRequest $request, Patient $patient)
    {
        $data = $request->validationData();
        if($request->file('image')){
            $data['image'] = asset('storage/'.$request->file('image')->store('patient_images', 'public'));
        }else{
            $data['image'] = $patient->image;
        }
        $patient->update($data);
        return Redirect::route('patient.index', ['lang'=>$lang])->with(['message' => translate('Updated successfully'), 'type' => 'success']);

    }

    public function destroy($lang, Patient $patient)
    {
        $patient->update(['status'=>false]);
        return Redirect::route('patient.index', ['lang'=>$lang])->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
    }

    public function patientDocuments($lang, Request $request)
    {
        switch ($request->method()){
            case 'POST':
                $data = $request->validate([
                    'details' => ['required'],
                    'patient_id' => ['required'],
                ]);
                $files = $request->file('attachments');
                foreach ($files as $file){
                    PatientAttachment::query()->create([
                        'path' => asset('storage/'.$file->store('patient_attachments', 'public')),
                        'file_name' => $file->getClientOriginalName(),
                        'file_size' => $file->getSize(),
                        'patient_id' => $data['patient_id'],
                        'details' => $data['details'],
                    ]);
                }
                return Redirect::route('patient.index', ['lang'=>$lang])->with(['message' => translate('Saved successfully'), 'type' => 'success']);
            case 'DELETE':
                $id = $request->get('file_id');
                $patient_attachment = PatientAttachment::query()->findOrFail($id)->delete();
                return Redirect::route('patient.index', ['lang'=>$lang])->with(['message' => translate('Saved successfully'), 'type' => 'success']);
            default:
                abort(404);
        }
    }
}
