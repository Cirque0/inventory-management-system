import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function MPSEquipmentForm({ data, setData, errors }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel htmlFor="type" value="Type" required />

                    <TextInput
                        id="type"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.type ? data.type : ""}
                        onChange={(e) => setData("type", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.type} />
                </div>

                <div>
                    <InputLabel htmlFor="make" value="Make/Brand" required />

                    <TextInput
                        id="make"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.make ? data.make : ""}
                        onChange={(e) => setData("make", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.make} />
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
                    <InputLabel htmlFor="cal" value="Cal" required />

                    <TextInput
                        id="cal"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.cal ? data.cal : ""}
                        onChange={(e) => setData("cal", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.cal} />
                </div>

                <div>
                    <InputLabel htmlFor="serial_num" value="Serial Number" required />

                    <TextInput
                        id="serial_num"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.serial_num ? data.serial_num : ""}
                        onChange={(e) => setData("serial_num", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.serial_num} />
                </div>
            </div>
        </>
    );
}
