<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorReportRequest;
use App\Http\Resources\DoctorReportResource;
use App\Models\DoctorReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DoctorReportController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('doctorreport-access');
        $doctorreports = DoctorReport::query();
        $datatable = new DatatableBuilder($doctorreports, $request, []);
        return Inertia::render('DoctorReport/DoctorReportIndex',[
            'doctorreports' => DoctorReportResource::collection($datatable->build())
        ]);
    }

    public function store($lang ){

        $data = \request()->validate([
            'details' => ['required', 'string'],
            'attachment' => ['required']
        ]);
        unset($data['attachment']);
        $data['user_id'] = auth()->id();
        $data['attachment_path'] = \request()->file('attachment')->store('doctors_reporting', 'public');
        $data['attachment_size'] = \request()->file('attachment')->getSize();
        $data['attachment_name'] = \request()->file('attachment')->getClientOriginalName();
        DoctorReport::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, DoctorReportRequest $request, $doctorreport){
        $this->allowed('doctorreport-edit-doctorreport');
        try {
            $doctorreport = DoctorReport::query()->findOrFail(decrypt($doctorreport));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($doctorreport->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('doctorreport_images','public'));
            }else{
                $data['image'] = $doctorreport->image;
            }*/
            $doctorreport->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $doctorreport){

        $this->allowed('doctorreport-delete-doctorreport');
        try {
            $doctorreport = DoctorReport::query()->findOrFail($doctorreport);
            /*if($doctorreport->image){
                HelperController::removeFile($doctorreport->image, 'url');
            }*/
            $doctorreport->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
