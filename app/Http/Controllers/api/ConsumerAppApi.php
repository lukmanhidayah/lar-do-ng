<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\BaseApi;
use App\Models\ConsumerApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ConsumerAppApi extends BaseApi
{
    /**
     * Display the specified resource.
     *
     * @param  int  $page
     * @return \Illuminate\Http\Response
     */
    public function getAll(Request $request)
    {

        $length = 10;
        $page = $request->page;
        $search = $request->name;
        $limit = (((int) $page) - 1) * $length;
        $data = [];
        $http_code = Response::HTTP_OK;

        $data = $this->withPage(ConsumerApp::select("*")->where('username', "LIKE", "%{$search}%"), $page, $limit, $length)
            ->get();

        $total_data = count(ConsumerApp::select("*")
            ->get());

        $response = [
            'message' => 'Retrieve data Consumer App',
            'total' => $total_data,
            'data' => $data
        ];

        if (count($response["data"]) > 0) {
            $http_code = Response::HTTP_OK;
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, 200);
    }

    /**
     * create the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $http_code = Response::HTTP_OK;
        $response = [
            'message' => 'Create data Consumer App success',
            'data' => []
        ];


        $rules = array(
            'username' => 'required|string|min:5|max:256|unique:consumer_apps',
            'password' => 'required|string|min:8|max:256',
            'description' => 'string|max:512',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $http_code = Response::HTTP_BAD_REQUEST;
            $response["message"] = implode(' ', $validator->getMessageBag()->all());
        } else {
            $data = ConsumerApp::create([
                'username' => $request->username,
                'password' => $request->password,
                'description' => $request->description,
            ]);

            $response["data"] = $data;
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, 200);
    }

    /**
     * remove the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $http_code = Response::HTTP_OK;
        $response = [
            'message' => 'Delete data Consumer App success',
            'data' => null
        ];

        $rules = array(
            'id' => 'required|not_in:1',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $http_code = Response::HTTP_BAD_REQUEST;
            $response["message"] = implode(' ', $validator->getMessageBag()->all());
        } else {
            $data = ConsumerApp::where("id", "=", $request->id)->delete()->get();

            if ($data == 0) {
                $http_code = Response::HTTP_BAD_REQUEST;
                $response["message"] = "Delete data Consumer App failed ";
            } else {
                $response["data"] = ["id" => $request->id];
            }
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, 200);
    }

    /**
     * remove the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function patch(Request $request)
    {
        $http_code = Response::HTTP_OK;
        $response = [
            'message' => 'Create data Consumer App success',
            'data' => []
        ];


        $rules = array(
            'id' => 'required|numeric|not_in:1',
            'username' => 'string|min:5|max:256',
            'password' => 'string|min:8|max:256',
            'description' => 'string|max:512',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $http_code = Response::HTTP_BAD_REQUEST;
            $response["message"] = implode(' ', $validator->getMessageBag()->all());
        } else {
            $duplicate_username = ConsumerApp::where("id", "<>", $request->id)->where('username', '=', $request->username)->get();

            if (count($duplicate_username) > 0) {
                $http_code = Response::HTTP_BAD_REQUEST;
                $response["message"] = "Username sudah terdaftar";
                $data = [];
            } else {
                $input = collect(request()->all())->filter()->all();
                $data = tap(ConsumerApp::where("id", "=", $request->id))->update($input)->first();
            }

            $response["data"] = $data;
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, 200);
    }
}
