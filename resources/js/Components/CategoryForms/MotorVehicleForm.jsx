import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function MotorVehicleForm({ data, setData, errors }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel
                        htmlFor="type"
                        value="Type"
                        required
                    />

                    <TextInput
                        id="type"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.type ? data.type : ''}
                        onChange={(e) =>
                            setData("type", e.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={errors.type}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="make"
                        value="Make/Brand"
                        required
                    />

                    <TextInput
                        id="make"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.make ? data.make : ''}
                        onChange={(e) =>
                            setData("make", e.target.value)
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={errors.make}
                    />
                </div>
            </div>
        </>
    );
}
