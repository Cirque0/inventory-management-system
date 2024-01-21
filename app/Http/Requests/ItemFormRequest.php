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
            'category' => ['required', Rule::in(array_keys(Relation::morphMap()))],
            'type' => ['required', 'string'],
            'acquisition_date' => ['required', 'date'],
            'acquisition_cost' => ['required', 'integer'],
            'source' => [Rule::excludeIf($this->category == 'Buildings and Facilities'), 'required', Rule::in(['Org', 'Don', 'Lnd', 'FAS'])],
            'status' => ['required', Rule::in(['Svc', 'Uns', 'BER', 'Alive', 'Lnef', 'Ret', 'Exp', 'In good condition', 'For repair', 'For condemnation'])],
            'quantity' => [Rule::excludeIf($this->category == 'Buildings and Facilities'), 'required', 'integer'],
            'value' => [Rule::excludeIf($this->category == 'Buildings and Facilities'), 'required', 'integer'],
            'location' => ['required', 'string'],
        ];

        switch($this->category) {
            case 'Motor Vehicle':
                $additionalRules = [
                    'make' => ['required', 'string'],
                    'engine_num' => ['required', 'string'],
                    'chassis_num' => ['required', 'string'],
                    'plate_num' => ['required', 'string'],
                ];
                break;

            case 'Water Craft':
                $additionalRules = [
                    'make' => ['required', 'string'],
                    'body_num' => ['required', 'string'],
                    'starboard_side' => ['required', 'string'],
                    'port_side' => ['required', 'string'],
                    'centerboard' => ['required', 'string'],
                ];
                break;

            case 'MPS Equipment':
                $additionalRules = [
                    'make' => ['required', 'string'],
                    'cal' => ['required', 'string'],
                    'serial_num' => ['required', 'string'],
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
                    'make' => ['required', 'string'],
                    'serial_num' => ['required', 'string'],
                ];
                break;

            case 'Work/Zoo Animals':
                $additionalRules = [
                    'name' => ['required', 'string'],
                    'breed' => ['required', 'string'],
                    'sex' => ['required', Rule::in(['Male', 'Female'])],
                    'color' => ['string'],
                    'microchip' => ['string'],
                ];
                break;

            case 'Quarters':
                $additionalRules = [
                    'make' => ['required', 'string'],
                ];
                break;
            
            case 'Buildings and Facilities':
                $additionalRules = [
                    'type' => ['required', Rule::in(['Temp', 'Perm', 'Semi Perm'])],
                    'building_code' => ['required', 'string'],
                    'description' => ['required', 'string'],
                    'occupying_office_unit' => ['required', 'string'],
                    'total_floor_area' => ['required', 'string'],
                    'repair_date' => ['nullable', 'date'],
                    'repair_cost' => ['nullable', 'integer'],
                    'building_ownership' => ['required', 'string'],
                ];
                break;
        }

        return array_merge($generalRules, $additionalRules);
    }
}
