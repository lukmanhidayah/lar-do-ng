<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'url_slug',
        'user_role_id',
        'updated_at',
        'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the userRole associated with the user.
     */
    public function userIdentity()
    {
        return $this->hasOne(UserIdentity::class);
    }

    public function userAddress()
    {
        return $this->hasOne(UserAddress::class);
    }

    public function userRole()
    {
        return $this->belongsTo(UserRole::class);
    }

    public function statusLks()
    {
        return $this->belongsTo(UserStatus::class);
    }
}
