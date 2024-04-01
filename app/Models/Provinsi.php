<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
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
        'deleted_at'
    ];

    public function kabupatenKota()
    {
        return $this->hasMany(KabupatenKota::class);
    }
}
