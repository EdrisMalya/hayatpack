<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index($lang, Request $request){
        $this->allowed('room-access');
        $rooms = Room::query();
        $datatable = new DatatableBuilder($rooms, $request, ['description', 'id_number', 'name', ]);
        return Inertia::render('Room/RoomIndex',[
            'rooms' => RoomResource::collection($datatable->build())
        ]);
    }

    public function store($lang, RoomRequest $request ){
        $this->allowed('room-create-room');
        $data = $request->validated();
        # $data['image'] = asset('storage/'.$request->file('image')->store('room_images','public'));
        Room::query()->create($data);
        return back()->with(['message' => translate('Saved successfully'), 'type' => 'success']);
    }
    public function update($lang, RoomRequest $request, $room){
        $this->allowed('room-edit-room');
        try {
            $room = Room::query()->findOrFail(decrypt($room));
            $data = $request->validated();
            /*if($request->file('image')){
                HelperController::removeFile($room->image, 'url');
                $data['image'] = asset('storage/'.$request->file('image')->store('room_images','public'));
            }else{
                $data['image'] = $room->image;
            }*/
            $room->update($data);
            return back()->with(['message' => translate('Updated successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::info($exception);
            abort(404);
        }
    }

    public function destroy($lang, Request $request, $room){
        $this->allowed('room-delete-room');
        try {
            $room = Room::query()->findOrFail(decrypt($room));
            /*if($room->image){
                HelperController::removeFile($room->image, 'url');
            }*/
            $room->delete();
            return back()->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
        catch (\Exception $exception){
            Log::error($exception);
            abort(404);
        }
    }

}
