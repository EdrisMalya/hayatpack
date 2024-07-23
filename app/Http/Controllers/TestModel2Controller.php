<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\TestModel2Request;
use App\Http\Resources\TestModel2Resource;
use App\Models\TestModel2;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TestModel2Controller extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('testmodel2-access');
        $testmodel2s = TestModel2::query();
        $datatable = new DatatableBuilder($testmodel2s, $request, []);
        return Inertia::render('TestModel2/TestModel2Index',[
            'testmodel2s' => TestModel2Resource::collection($datatable->build())
        ]);
    }

    public function store($lang, TestModel2Request $request ){
        $this->allowed('testmodel2-create-testmodel2');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('testmodel2_images','public'));
        TestModel2::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, TestModel2Request $request, $testmodel2){
        $this->allowed('testmodel2-edit-testmodel2');
        try {
            $testmodel2 = TestModel2::query()->findOrFail(decrypt($testmodel2));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($testmodel2->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('testmodel2_images','public'));
            }else{
                $data['image'] = $testmodel2->image;
            }*/
            $testmodel2->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $testmodel2){
        $this->allowed('testmodel2-delete-testmodel2');
        try {
            $testmodel2 = TestModel2::query()->findOrFail(decrypt($testmodel2));
            /*if($testmodel2->image){
                HelperController::removeFile($testmodel2->image, 'url');
            }*/
            $testmodel2->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
