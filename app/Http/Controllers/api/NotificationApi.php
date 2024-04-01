<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\api\BaseApi;
use App\Models\Notification;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class NotificationApi extends BaseApi
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {
        $length = 10;
        $page = $request->page;
        $id = $request->id;
        $limit = (((int) $page) - 1) * $length;
        $data = [];
        $http_code = Response::HTTP_ACCEPTED;

        $data = $this->withPage(
            Notification::select(
                "notifications.id as id",
                "notifications.message as message",
                "users.name as name",
                "users.email as email",
                "users.id as user_id",
                "notifications.status_id as status_id",
                "notifications.created_at as created_at",
                "notifications.updated_at as updated_at",
            )
                ->where('to_id', '=', $id)
                ->whereNull('notifications.deleted_at')
                ->orderBy("notifications.created_at", "DESC")
                ->leftJoin(
                    "users",
                    "users.id",
                    "=",
                    "from_id"
                ),
            $page,
            $limit,
            $length
        )
            ->get();

        $there_not_unread_yet = count(Notification::select("id")
        ->where('status_id', '=', 1)
        ->where('to_id', '=', $id)
        ->get());    

        $total_data = count(Notification::select()
            ->whereNull('notifications.deleted_at')
            ->where('to_id', '=', $id)
            ->get());

        $response = [
            'message' => 'Retrieve data notification',
            'mark_as_read_action' => $there_not_unread_yet > 0 ? true :false,
            'total' => $total_data,
            'data' => $data
        ];

        if (count($response["data"]) > 0) {
            $http_code = Response::HTTP_OK;
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, $http_code);
    }

    public function markAllAsRead(Request $request)
    {
        $id = $request->id;
        $data = [];
        $http_code = Response::HTTP_OK;
        $now = Carbon::now();

        $data = Notification::where('to_id', '=', $id)
            ->where('status_id', '=', 1)
            ->update([
                "status_id" => 2,
                'updated_at' => $now->toDateTimeString()
            ]);

        $response = [
            'code' => Response::HTTP_OK,
            'message' => $data > 0 ? 'Update data notification' : "There's no update data notification",
            'data' => null
        ];

        return response()->json($response, $http_code);
    }
}
