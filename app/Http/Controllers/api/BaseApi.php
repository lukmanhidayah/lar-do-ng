<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;

class BaseApi extends Controller
{
    protected function withPage($eloquent, $page, $limit, $length)
    {
        if (isset($page)) {
            return $eloquent
                ->skip($limit)
                ->take($length);
        }
        return $eloquent;
    }
}
