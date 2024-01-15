import InputError from "../InputError";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import Combobox from "../Combobox";

export default function AnimalForm({ data, setData, errors }) {
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
                    <InputLabel htmlFor="breed" value="Breed" required />

                    <TextInput
                        id="breed"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.breed ? data.breed : ""}
                        onChange={(e) => setData("breed", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.breed} />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputLabel htmlFor="sex" value="Sex" required />

                    <Combobox
                        value={data.sex}
                        onChange={(value) => setData('sex', value)}
                        className="mt-1 block w-full"
                        options={['Male', 'Female']}
                    />
                    
                    <InputError className="mt-2" message={errors.sex} />
                </div>

                <div>
                    <InputLabel htmlFor="color" value="Color" required />

                    <TextInput
                        id="color"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.color ? data.color : ""}
                        onChange={(e) => setData("color", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.color} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="microchip" value="Microchip" required />

                <TextInput
                    id="microchip"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.microchip ? data.microchip : ""}
                    onChange={(e) => setData("microchip", e.target.value)}
                    required
                />

                <InputError className="mt-2" message={errors.microchip} />
            </div>
        </>
    );
}
