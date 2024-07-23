<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\TestModelRequest;
use App\Http\Resources\TestModelResource;
use App\Models\TestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TestModelController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('testmodel-access');
        $testmodels = TestModel::query();
        $datatable = new DatatableBuilder($testmodels, $request, []);
        return Inertia::render('TestModel/TestModelIndex',[
            'testmodels' => TestModelResource::collection($datatable->build())
        ]);
    }

    public function store($lang, TestModelRequest $request ){
        $this->allowed('testmodel-create-testmodel');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('testmodel_images','public'));
        TestModel::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, TestModelRequest $request, $testmodel){
        $this->allowed('testmodel-edit-testmodel');
        try {
            $testmodel = TestModel::query()->findOrFail(decrypt($testmodel));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($testmodel->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('testmodel_images','public'));
            }else{
                $data['image'] = $testmodel->image;
            }*/
            $testmodel->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $testmodel){
        $this->allowed('testmodel-delete-testmodel');
        try {
            $testmodel = TestModel::query()->findOrFail(decrypt($testmodel));
            /*if($testmodel->image){
                HelperController::removeFile($testmodel->image, 'url');
            }*/
            $testmodel->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
