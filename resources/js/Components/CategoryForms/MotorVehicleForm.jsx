import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function MotorVehicleForm({ data, setData, errors }) {
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

            <div>
                <InputLabel htmlFor="engine_num" value="Engine Number" required />

                <TextInput
                    id="engine_num"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.engine_num ? data.engine_num : ""}
                    onChange={(e) => setData("engine_num", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.engine_num} />
            </div>

            <div>
                <InputLabel htmlFor="chassis_num" value="Chassis Number" required />

                <TextInput
                    id="chassis_num"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.chassis_num ? data.chassis_num : ""}
                    onChange={(e) => setData("chassis_num", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.chassis_num} />
            </div>

            <div>
                <InputLabel htmlFor="plate_num" value="Plate Number" required />

                <TextInput
                    id="plate_num"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.plate_num ? data.plate_num : ""}
                    onChange={(e) => setData("plate_num", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.plate_num} />
            </div>
        </>
    );
}
