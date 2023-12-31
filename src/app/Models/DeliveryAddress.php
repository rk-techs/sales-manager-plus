<?php

namespace App\Models;

use App\Enums\AddressType;
use App\Services\AddressService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryAddress extends Model
{
    use HasFactory;

    protected $appends = ['address_type_label'];

    protected $fillable = [
        'customer_id',
        'address_type',
        'postal_code',
        'address',
        'company_name',
        'contact_name',
        'tel',
        'note',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors & Mutators
    |--------------------------------------------------------------------------
    */
    protected function getAddressTypeLabelAttribute(): string
    {
        return AddressType::getLabelFromValue($this->address_type);
    }

    public function setAddressAttribute(?string $value): void
    {
        $this->attributes['address'] = $value;

        $addressService = new AddressService();
        $prefectureId   = $addressService->getPrefectureIdFromAddress($value);

        $this->attributes['prefecture_id'] = $prefectureId;
    }
}
