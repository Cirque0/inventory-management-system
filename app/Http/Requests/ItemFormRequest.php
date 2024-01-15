<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ItemFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role_id === 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $generalRules = [
            'category' => [Rule::in(array_keys(Relation::morphMap()))],
            'name' => ['string'],
            'acquisition_date' => ['date'],
            'acquisition_cost' => ['integer'],
            'source' => [Rule::in(['Org', 'Don', 'Lnd', 'FAS'])],
            'status' => [Rule::in(['Svc', 'Uns', 'BER'])],
            'quantity' => ['integer'],
            'value' => ['integer'],
            'location' => ['string'],
        ];

        switch($this->category) {
            case 'Motor Vehicle':
                $additionalRules = [
                    'type' => ['string'],
                    'make' => ['string'],
                    'engine_num' => ['string'],
                    'chassis_num' => ['string'],
                    'plate_num' => ['string'],
                ];
                break;

            case 'Water Craft':
                $additionalRules = [
                    'type' => ['string'],
                    'make' => ['string'],
                    'body_num' => ['string'],
                    'starboard_side' => ['string'],
                    'port_side' => ['string'],
                    'centerboard' => ['string'],
                ];
                break;

            case 'MPS Equipment':
                $additionalRules = [
                    'type' => ['string'],
                    'make' => ['string'],
                    'cal' => ['string'],
                    'serial_num' => ['string'],
                ];
                break;

            case 'Communications Equipment':
            case 'Technical Scientific Equipment':
            case 'ICT':
            case 'Office Equipment':
            case 'Furniture Fixture':
            case 'Medical Equipment':
            case 'Other Machinery and Equipment':
            case 'Disaster Response and Rescue Equipment':
            case 'Other Property Equipment':
            case 'Office Supplies':
                $additionalRules = [
                    'type' => ['string'],
                    'make' => ['string'],
                    'serial_num' => ['string'],
                ];
                break;

            case 'Animal':
                $additionalRules = [
                    'type' => ['required', 'string'],
                    'breed' => ['required', 'string'],
                    'sex' => ['required', Rule::in(['Male', 'Female'])],
                    'color' => ['string'],
                    'microchip' => ['string'],
                ];
                break;

            case 'Quarters':
                $additionalRules = [
                    'type' => ['string'],
                    'make' => ['string'],
                ];
                break;
        }

        return array_merge($generalRules, $additionalRules);
    }
}
