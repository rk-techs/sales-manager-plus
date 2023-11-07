<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogisticsAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'address_type',
        'post_code',
        'address',
        'company_name',
        'contact_name',
        'tel',
        'note',
    ];
}
