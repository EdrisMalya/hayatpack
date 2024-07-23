<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\BedRequest;
use App\Http\Resources\BedResource;
use App\Http\Resources\RoomResource;
use App\Models\Bed;
use App\Models\Patient;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BedController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('bed-access');
        $beds = Bed::query()->with(['room']);
        $datatable = new DatatableBuilder($beds, $request, ['description', 'id_number', 'name', 'room_id', ]);
        return Inertia::render('Bed/BedIndex',[
            'beds' => BedResource::collection($datatable->build()),
            'rooms' => RoomResource::collection(
                Room::all()
            )
        ]);
    }

    public function store($lang, BedRequest $request ){
        $this->allowed('bed-create-bed');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('bed_images','public'));
        Bed::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, BedRequest $request, $bed){
        $this->allowed('bed-edit-bed');
        try {
            $bed = Bed::query()->findOrFail(decrypt($bed));
            $data = $request->validated();
            if(Patient::query()->where('bed_id', $bed->id)->exists()){
                return back()->with(['message' => translate('Cannot be deleted'), 'type' => 'error']);

            }
            $bed->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $bed){
        $this->allowed('bed-delete-bed');
        try {
            $bed = Bed::query()->findOrFail(decrypt($bed));
            /*if($bed->image){
                HelperController::removeFile($bed->image, 'url');
            }*/
            $bed->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
