<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\api\BaseApi;
use App\Models\User;
use App\Models\UserActivity;

class AktivitasApi extends BaseApi
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
        if ($request->length) {
            $length = (int) $request->length;
        }
        $page = $request->page;
        $limit = (((int) $page) - 1) * $length;
        $data = [];
        $url_slug = $request->url_slug;
        $http_code = Response::HTTP_ACCEPTED;
        $user = User::select("id")->where("url_slug", "=", $url_slug)->first();

        $response = [
            'message' => 'Retrieve data aktivitas',
            'total' => 0,
            'data' => $data
        ];

        if (isset($user)) {
            $data = $this->withPage(
                UserActivity::select(
                    "user_activities.id as id",
                    "users.name as name",
                    "user_activity_images.name as foto",
                    "user_activities.nama as title",
                    "user_activities.deksripsi as deksripsi",
                    "user_activities.jumlah as jumlah",
                    "user_activities.sasaran as sasaran",
                    "user_activities.tujuan as tujuan",
                    "user_activities.maksud as maksud",
                    "user_activities.total_anggaran as total_anggaran",
                    "user_activities.narasumber as narasumber",
                    "user_activities.tempat as tempat",
                    "user_activities.tanggal as tanggal",
                    "user_activities.created_at as created_at",
                    "user_activities.updated_at as updated_at",
                )
                    ->where('user_id', '=', $user->id)
                    ->whereNull('user_activities.deleted_at')
                    ->leftJoin(
                        "users",
                        "users.id",
                        "=",
                        "user_activities.user_id"
                    )
                    ->leftJoin(
                        "user_activity_images",
                        "user_activity_images.activity_id",
                        "=",
                        "user_activities.id"
                    )
                    ->groupBy("user_activities.id")
                    ->orderBy("user_activities.created_at", "DESC"),
                $page,
                $limit,
                $length
            )
                ->get();

            $total_data = count(UserActivity::select()
                ->where('user_id', '=', $user->id)
                ->whereNull('user_activities.deleted_at')
                ->get());
            
            $response = [
                'message' => 'Retrieve data aktivitas',
                'total' => $total_data,
                'data' => $data
            ];


            if (count($response["data"]) > 0) {
                $http_code = Response::HTTP_OK;
            }

            $response = array_merge([
                'code' => $http_code,
            ], $response);
        }

        return response()->json($response, $http_code);
    }
}
