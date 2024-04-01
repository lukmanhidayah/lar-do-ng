<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\api\BaseApi;
use App\Models\AdminPermohonanLog;

class AppLog extends BaseApi
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function logAdmin(Request $request)
    {
        $length = 10;
        $page = $request->page;
        $limit = (((int) $page) - 1) * $length;
        $data = [];
        $id = $request->id;
        $http_code = Response::HTTP_ACCEPTED;

        $data = $this->withPage(
            AdminPermohonanLog::select(
                "admin_permohonan_logs.id as id",
                "users.name as name",
                "user_statuses.name as status_name",
                "admin_permohonan_logs.status_id as status_id",
                "admin_permohonan_logs.created_at as created_at",
                "admin_permohonan_logs.updated_at as updated_at",
            )
                ->where('from_id', '=', $id)
                ->leftJoin(
                    "users",
                    "users.id",
                    "=",
                    "user_id"
                )
                ->leftJoin(
                    "user_statuses",
                    "user_statuses.id",
                    "=",
                    "status_id"
                )->orderBy("admin_permohonan_logs.created_at", "DESC"),
            $page,
            $limit,
            $length
        )
            ->get();

        $total_data = count(AdminPermohonanLog::select()
            ->where('from_id', '=', $id)
            ->get());

        $response = [
            'message' => 'Retrieve data admin log',
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
}
