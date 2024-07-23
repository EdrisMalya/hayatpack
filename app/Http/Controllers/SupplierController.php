<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('supplier-access');
        $total_due = Supplier::query()->sum('due_amount');
        $suppliers = Supplier::query();
        $datatable = new DatatableBuilder($suppliers, $request, ['details', 'due_amount', 'responsible', 'supplier_name', 'total_amount', ]);
        return Inertia::render('Supplier/SupplierIndex',[
            'suppliers' => SupplierResource::collection($datatable->build()),
            'total_due' => $total_due
        ]);
    }

    public function store($lang, SupplierRequest $request ){
        $this->allowed('supplier-create-supplier');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('supplier_images','public'));
        Supplier::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, SupplierRequest $request, $supplier){
        $this->allowed('supplier-edit-supplier');
        try {
            $supplier = Supplier::query()->findOrFail(decrypt($supplier));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($supplier->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('supplier_images','public'));
            }else{
                $data['image'] = $supplier->image;
            }*/
            $supplier->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $supplier){
        $this->allowed('supplier-delete-supplier');
        try {
            $supplier = Supplier::query()->findOrFail(decrypt($supplier));
            /*if($supplier->image){
                HelperController::removeFile($supplier->image, 'url');
            }*/
            $supplier->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
