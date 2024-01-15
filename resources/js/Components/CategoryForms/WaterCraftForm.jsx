import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function WaterCraftForm({ data, setData, errors }) {
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
                <InputLabel htmlFor="body_num" value="Body Number" required />

                <TextInput
                    id="body_num"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.body_num ? data.body_num : ""}
                    onChange={(e) => setData("body_num", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.body_num} />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel htmlFor="starboard_side" value="Starboard Side" required />

                    <TextInput
                        id="starboard_side"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.starboard_side ? data.starboard_side : ""}
                        onChange={(e) => setData("starboard_side", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.starboard_side} />
                </div>

                <div>
                    <InputLabel htmlFor="port_side" value="Port Side" required />

                    <TextInput
                        id="port_side"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.port_side ? data.port_side : ""}
                        onChange={(e) => setData("port_side", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.port_side} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="centerboard" value="Centerboard" required />

                <TextInput
                    id="centerboard"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.centerboard ? data.centerboard : ""}
                    onChange={(e) => setData("centerboard", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.centerboard} />
            </div>
        </>
    );
}
