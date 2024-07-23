<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\PeriodRequest;
use App\Http\Resources\PeriodResource;
use App\Models\Patient;
use App\Models\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PeriodController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('period-access');
        $periods = Period::query();
        $datatable = new DatatableBuilder($periods, $request, ['description', 'id_number', 'name', ]);
        return Inertia::render('Period/PeriodIndex',[
            'periods' => PeriodResource::collection($datatable->build())
        ]);
    }

    public function store($lang, PeriodRequest $request ){
        $this->allowed('period-create-period');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('period_images','public'));
        Period::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, PeriodRequest $request, $period){
        $this->allowed('period-edit-period');
        try {
            $period = Period::query()->findOrFail(decrypt($period));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($period->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('period_images','public'));
            }else{
                $data['image'] = $period->image;
            }*/
            $period->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $period){
        $this->allowed('period-delete-period');
        try {
            $period = Period::query()->findOrFail(decrypt($period));
            if(Patient::query()->where('period_id', $period->id)->exists()){
                return back()->with(['message' => translate('Cannot be deleted'), 'type' => 'error']);
            }
            $period->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
