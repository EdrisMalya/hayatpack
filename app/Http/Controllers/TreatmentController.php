<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\TreatmentRequest;
use App\Http\Resources\TreatmentResource;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TreatmentController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('treatment-access');
        $treatments = Treatment::query();
        $datatable = new DatatableBuilder($treatments, $request, ['description', 'id_number', 'name', ]);
        return Inertia::render('Treatment/TreatmentIndex',[
            'treatments' => TreatmentResource::collection($datatable->build())
        ]);
    }

    public function store($lang, TreatmentRequest $request ){
        $this->allowed('treatment-create-treatment');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('treatment_images','public'));
        Treatment::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, TreatmentRequest $request, $treatment){
        $this->allowed('treatment-edit-treatment');
        try {
            $treatment = Treatment::query()->findOrFail(decrypt($treatment));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($treatment->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('treatment_images','public'));
            }else{
                $data['image'] = $treatment->image;
            }*/
            $treatment->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $treatment){
        $this->allowed('treatment-delete-treatment');
        try {
            $treatment = Treatment::query()->findOrFail(decrypt($treatment));
            /*if($treatment->image){
                HelperController::removeFile($treatment->image, 'url');
            }*/
            $treatment->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
