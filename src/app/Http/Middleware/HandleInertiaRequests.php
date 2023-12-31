<?php

namespace App\Http\Middleware;

use App\Enums\AddressType;
use App\Enums\ContactMethod;
use App\Enums\InquiryStatus;
use App\Enums\PaymentTerm\BillingType;
use App\Enums\PaymentTerm\CutoffDay;
use App\Enums\PaymentTerm\PaymentDay;
use App\Enums\PaymentTerm\PaymentDayOffset;
use App\Enums\PaymentTerm\PaymentMonthOffset;
use App\Enums\ProductType;
use App\Models\TaxRate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'appName'   => config('app.name'),
            'auth.user' => fn () => $request->user()
            ? $request->user()->only('id', 'name', 'email')
            : null,
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'date' => [
                'today' => Carbon::today()->format('Y-m-d'),
            ],
            'taxRate' => TaxRate::getCurrentTaxRate(),
            'paymentTermOptions' => [
                'billingTypes' => BillingType::toArray(),
                'cutoffDays'   => CutoffDay::toArray(),
                'monthOffsets' => PaymentMonthOffset::toArray(),
                'paymentDay'   => PaymentDay::toArray(),
                'dayOffsets'   => PaymentDayOffset::toArray(),
            ],
            'addressTypeOptions'    => AddressType::toArray(),
            'inquiryStatusOptions'  => InquiryStatus::toArray(),
            'contactMethodOptions'  => ContactMethod::toArray(),
            'productTypeOptions'    => ProductType::toArray(),
        ]);
    }
}
