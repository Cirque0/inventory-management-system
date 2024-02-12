import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import Combobox from "../Combobox";

export default function FacilitiesForm({ data, setData, errors }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel htmlFor="building_code" value="Building Code" required />

                    <TextInput
                        id="building_code"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.building_code ? data.building_code : ''}
                        onChange={(e) => setData("building_code", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.building_code} />
                </div>

                <div>
                    <InputLabel htmlFor="location" value="Location" required />

                    <TextInput
                        id="location"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.location} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel value="Type" required />

                    <Combobox
                        value={data.type ? data.type : ''}
                        onChange={(value) => setData("type", value)}
                        className="mt-1 block w-full"
                        options={['Temp', 'Perm', 'Semi Perm']}
                    />

                    <InputError className="mt-2" message={errors.type} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" required />

                    <TextInput
                        id="description"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="property_num" value="Property Number" required />

                <TextInput
                    id="property_num"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.property_num ? data.property_num : ""}
                    onChange={(e) => setData("property_num", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.property_num} />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel htmlFor="occupying_office_unit" value="Occupying Office Unit" required />

                    <TextInput
                        id="occupying_office_unit"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.occupying_office_unit ? data.occupying_office_unit : ''}
                        onChange={(e) => setData("occupying_office_unit", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.occupying_office_unit} />
                </div>

                <div>
                    <InputLabel htmlFor="total_floor_area" value="Total Floor Area" required />

                    <TextInput
                        id="total_floor_area"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.total_floor_area || ''}
                        onChange={(e) => setData("total_floor_area", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.total_floor_area} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel
                        htmlFor="acqusition_date"
                        value="Construction/Acquisition Date"
                        required
                    />

                    <TextInput
                        id="acquisition_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.acquisition_date}
                        onChange={(e) =>
                            setData("acquisition_date", e.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={errors.acquisition_date}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="acquisition_cost"
                        value="Construction/Acquisition Cost"
                        required
                    />

                    <TextInput
                        id="acquisition_cost"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.acquisition_cost}
                        onChange={(e) =>
                            setData("acquisition_cost", e.target.value)
                        }
                        required
                        min={0}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.acquisition_cost}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel
                        htmlFor="repair_date"
                        value="Date of Repair"
                    />

                    <TextInput
                        id="repair_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.repair_date || ''}
                        onChange={(e) =>
                            setData("repair_date", e.target.value)
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.repair_date}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="repair_cost"
                        value="Cost of Repair"
                    />

                    <TextInput
                        id="repair_cost"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.repair_cost || ''}
                        onChange={(e) =>
                            setData("repair_cost", e.target.value)
                        }
                        min={0}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.repair_cost}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel value="Source" required />

                    <Combobox
                        value={data.source}
                        onChange={(value) => setData("source", value)}
                        className="mt-1 block w-full"
                        options={["Org", "Don", "Lnd", "FAS"]}
                    />

                    <InputError className="mt-2" message={errors.source} />
                </div>

                <div>
                    <InputLabel value="Status" required />

                    <Combobox
                        value={data.status}
                        onChange={(value) => setData("status", value)}
                        className="mt-1 block w-full"
                        options={['In good condition', 'For repair', 'For condemnation']}
                    />

                    <InputError className="mt-2" message={errors.status} />
                </div>
            </div>

            <div>
                <InputLabel
                    htmlFor="building_ownership"
                    value="Building Ownership"
                    required
                />

                <TextInput
                    id="building_ownership"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.building_ownership || ''}
                    onChange={(e) =>
                        setData("building_ownership", e.target.value)
                    }
                    required
                    min={0}
                />

                <InputError
                    className="mt-2"
                    message={errors.building_ownership}
                />
            </div>
        </>
    );
}
