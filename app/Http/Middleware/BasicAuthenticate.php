<?php

namespace App\Http\Middleware;

use App\Models\ConsumerApp;
use Closure;
use Illuminate\Http\Request;

class BasicAuthenticate
{
    /**
     * Handle an incoming request.
     * type = 1 is for all
     * type = 2 is only super admin - dinsos
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $type)
    {
        $unAuthResponse = [
            'code' => 401,
            'message' => 'You Unauthorized',
            'total' => 0,
            'data' => []
        ];

        if ($type == "2" && $request->getUser() !== "sipelaku") {
            $unAuthResponse["message"] = "Only Super Admin can be access";

            return response($unAuthResponse, 404, ['WWW-Authenticate' => 'Basic']);
        }

        // checking basic auth
        $consumerApp =  ConsumerApp::select('*')->where(
            'username',
            "=",
            $request->getUser()
        )->where(
            'password',
            "=",
            $request->getPassword()
        )->first();

        if (isset($consumerApp)) {
            return $next($request);
        }

        return response($unAuthResponse, 401, ['WWW-Authenticate' => 'Basic']);
    }
}
