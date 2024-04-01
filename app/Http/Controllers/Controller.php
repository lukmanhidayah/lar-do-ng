<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function mymapper($arrayParams, $callBack)
    {
        $resultarr = array();
        foreach ($arrayParams as $key => $value) {
            $resultarr[] = $callBack($key, $value);
        }
        return $resultarr;
    }

    protected function chartMapper($arrayParams, $callBack)
    {
        $obj = new \stdClass();
        foreach ($arrayParams as $key => $object) {
            foreach ($callBack($key, $object) as $objKey => $value) {
                $obj->$objKey[] = $value;
            }
        }
        return $obj;
    }
}
