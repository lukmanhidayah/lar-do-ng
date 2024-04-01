<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'updated_at',
        'kabupaten_kota_id',
        'deleted_at'
    ];

    public function userAddress()
    {
        return $this->hasMany(UserAddress::class);
    }
}
