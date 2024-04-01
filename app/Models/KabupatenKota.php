<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KabupatenKota extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'provinsi_id',
        'updated_at',
        'deleted_at'
    ];

    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class);
    }
}
