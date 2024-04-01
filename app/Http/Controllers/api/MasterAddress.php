<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use Symfony\Component\HttpFoundation\Response;

class MasterAddress extends Controller
{


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function kecamatan($kabupatan_kota_id)
    {

        $http_code = Response::HTTP_ACCEPTED;
        $data = Kecamatan::where('kabupatan_kota_id', $kabupatan_kota_id)->orderBy("name", "ASC")->get();

        $response = [
            'message' => 'Retrieve data kecamatan',
            'total' => count($data),
            'data' => $this->mymapper($data, function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            })
        ];

        if (count($response["data"]) > 0) {
            $http_code = Response::HTTP_OK;
        }

        $response = array_merge([
            'code' => $http_code
        ], $response);

        return response()->json($response, $http_code);
    }

    public function kelurahan($kecamatan_id)
    {
        $http_code = Response::HTTP_ACCEPTED;
        $data = Kelurahan::where('kecamatan_id', $kecamatan_id)->orderBy("name", "ASC")->get();

        $response = [
            'message' => 'Retrieve data kelurahan',
            'total' => count($data),
            'data' => $this->mymapper($data, function ($key, $value) {
                return [
                    'value' =>  $value->id,
                    'label' => ucwords(strtolower($value->name))
                ];
            })
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
