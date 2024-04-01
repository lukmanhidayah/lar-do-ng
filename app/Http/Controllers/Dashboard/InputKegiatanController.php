<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\UserActivity;
use App\Models\UserActivityImage;
use App\Models\UserIdentity;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InputKegiatanController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $totalNotify = count(Notification::select()->where("to_id", "=", Auth::user()->id)->where("status_id", "=", 1)->get());
        $identity = UserIdentity::select("status_id", "logo")->where("user_id", "=", Auth::user()->id)->first();
        return Inertia::render('User/InputKegiatan', [
            "totalNotify" => $totalNotify,
            "status_id" => $identity->status_id,
            "identity" => $identity,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:125',
            'deksripsi' => 'required|string',
            'jumlah' => 'required|numeric',
            'sasaran' => 'required|string|max:125',
            'tujuan' => 'required|string|max:125',
            'total_anggaran' => 'required|numeric',
            'maksud' => 'required|string|max:125',
            'narasumber' => 'required|string|max:125',
            'tempat' => 'required|string|max:125',
            'tanggal' => 'required|date',
            'foto' => 'required',
            'foto.*' => 'mimes:jpg,jpeg,png|max:5120',
        ]);

        DB::transaction(function () use ($request) {

            $user_id = Auth::user()->id;
            $carbon = new Carbon;

            $manipulateName = str_replace(' ', '_', strtolower(Auth::user()->name));
            $date = $carbon->year . "_" . $carbon->month . "_" . $carbon->day . "_" . $carbon->hour . "_" . $carbon->minute . "_" . $carbon->second;
            
            $userActivity = UserActivity::create([
                'user_id' => $user_id,
                'nama' => $request->nama,
                'deksripsi' => $request->deksripsi,
                'jumlah' => $request->jumlah,
                'sasaran' => $request->sasaran,
                'tujuan' => $request->tujuan,
                'total_anggaran' => $request->total_anggaran,
                'maksud' => $request->maksud,
                'narasumber' => $request->narasumber,
                'tempat' => $request->tempat,
                'tanggal' => new Carbon($request->tanggal),
            ]);

            $iCount = 0;
            foreach ($request->file('foto') as $thisImage) {
                $extension = $thisImage->getClientOriginalExtension();

                $fileName = "kegiatan_" . $date . "_" . $iCount . '.' . $extension;

                $thisImage->storeAs('uploads/' . $manipulateName, $fileName, 'public');
                $iCount++;

                UserActivityImage::create([
                    'activity_id' => $userActivity->id,
                    'name' => $manipulateName . "/" . $fileName,
                ]);
            }
        });

        return back();
    }
}
