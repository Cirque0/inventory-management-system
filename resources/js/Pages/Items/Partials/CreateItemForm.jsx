import AnimalForm from "@/Components/CategoryForms/AnimalForm";
import FacilitiesForm from "@/Components/CategoryForms/FacilitiesForm";
import GenericEquipmentForm from "@/Components/CategoryForms/GenericEquipmentForm";
import MPSEquipmentForm from "@/Components/CategoryForms/MPSEquipmentForm";
import MotorVehicleForm from "@/Components/CategoryForms/MotorVehicleForm";
import QuarterForm from "@/Components/CategoryForms/QuarterForm";
import WaterCraftForm from "@/Components/CategoryForms/WaterCraftForm";
import Combobox from "@/Components/Combobox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CreateItemForm({ className, categories }) {
    const { data, setData, post, reset, errors, processing, recentlySuccessful } = useForm({
        category: '',
        acquisition_date: '',
        acquisition_cost: '',
        source: '',
        status: '',
        quantity: '',
        value: '',
        location: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('items.store'), {
            onSuccess: () => {
                reset();
            },
        });
    }

    useEffect(() => {
        reset('status');
    }, [data.category])

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Add an Item</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel value="Category" required />

                    <Combobox
                        value={data.category}
                        onChange={(value) => setData('category', value)}
                        className="mt-1 block w-full"
                        options={categories}
                    />

                    <InputError className="mt-2" message={errors.category} />
                </div>

                {/* {data.category === 'motor_vehicle' && <MotorVehicleForm data={data} setData={setData} errors={errors} />} */}
                {(() => {
                    switch(data.category) {
                        case "Motor Vehicle":
                            return <MotorVehicleForm data={data} setData={setData} errors={errors} />
                        case "Water Craft":
                            return <WaterCraftForm data={data} setData={setData} errors={errors} />
                        case "MPS Equipment":
                        case "MPS Equipment Non-Combat":
                            return <MPSEquipmentForm data={data} setData={setData} errors={errors} />
                        case "Communications Equipment":
                        case "Technical Scientific Equipment":
                        case "ICT":
                        case "Office Equipment":
                        case "Furniture Fixture":
                        case "Medical Equipment":
                        case "Other Machinery and Equipment":
                        case "Disaster Response and Rescue Equipment":
                        case "Other Property Equipment":
                        case "Office Supplies":
                            return <GenericEquipmentForm data={data} setData={setData} errors={errors} />
                        case "Work/Zoo Animals":
                            return <AnimalForm data={data} setData={setData} errors={errors} />
                        case "Quarters":
                            return <QuarterForm data={data} setData={setData} errors={errors} />
                        case "Buildings and Facilities":
                            return <FacilitiesForm data={data} setData={setData} errors={errors} />
                    }
                })()}

                {(data.category && data.category !== "Buildings and Facilities") && (
                    <>
                        <div className="grid grid-cols-2 gap-x-2">
                            <div>
                                <InputLabel htmlFor="acqusition_date" value="Acquisition Date" required />

                                <TextInput
                                    id="acquisition_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.acquisition_date}
                                    onChange={(e) => setData('acquisition_date', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.acquisition_date} />
                            </div>

                            <div>
                                <InputLabel htmlFor="acquisition_cost" value="Acquisition Cost" required />

                                <TextInput
                                    id="acquisition_cost"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.acquisition_cost}
                                    onChange={(e) => setData('acquisition_cost', e.target.value)}
                                    required
                                    min={0}
                                />

                                <InputError className="mt-2" message={errors.acquisition_cost} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <div>
                                <InputLabel value="Source" required />
                                
                                <Combobox
                                    value={data.source}
                                    onChange={(value) => setData('source', value)}
                                    className="mt-1 block w-full"
                                    options={['Org', 'Don', 'Lnd', 'FAS', 'Proc']}
                                />
                                
                                <InputError className="mt-2" message={errors.source} />
                            </div>

                            <div>
                                <InputLabel value="Status" required />
                                
                                <Combobox
                                    value={data.status}
                                    onChange={(value) => setData('status', value)}
                                    className="mt-1 block w-full"
                                    options={data.category === 'Work/Zoo Animals' ? ['Alive', 'Lnef', 'Ret', 'Exp'] : ['Svc', 'Uns', 'BER']}
                                />
                                
                                <InputError className="mt-2" message={errors.status} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <div>
                                <InputLabel htmlFor="quantity" value="Quantity" required />

                                <TextInput
                                    id="quantity"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    required
                                    min={0}
                                />

                                <InputError className="mt-2" message={errors.quantity} />
                            </div>

                            <div>
                                <InputLabel htmlFor="value" value="Value" required />

                                <TextInput
                                    id="value"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    required
                                    min={0}
                                />

                                <InputError className="mt-2" message={errors.value} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="location" value="Location" required />

                            <TextInput
                                id="location"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                required
                            />

                            <InputError className="mt-2" message={errors.location} />
                        </div>
                    </>
                )}

                
                <div className="flex items-center gap-4">
                    <PrimaryButton className="gap-1 !bg-indigo-600 hover:!bg-indigo-500 focus:!bg-indigo-700 active:!bg-indigo-900 focus:!ring-indigo-500" disabled={processing || !data.category}>
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Item</span>
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Successfully created item.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}