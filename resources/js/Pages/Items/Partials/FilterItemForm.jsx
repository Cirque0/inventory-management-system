import Checkbox from "@/Components/Checkbox";
import Combobox from "@/Components/Combobox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";

export default function FilterItemForm({ categories, show, onClose }) {
    const { data, setData, get, transform, errors } = useForm({
        category: route().params.category || 'All',
        name: '',
    });

    const searchItems = (e) => {
        e.preventDefault();

        get(route('items.show'));
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={searchItems} className="p-6 space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Search for Items
                </h2>

                <div>
                    <InputLabel value="Category" required />

                    <Combobox
                        value={data.category}
                        onChange={(value) => setData('category', value)}
                        className="mt-1 block w-full"
                        options={['All', ...categories]}
                    />

                    <InputError className="mt-2" message={errors.category} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                
                <div className="mt-6 flex justify-end gap-2">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                    <PrimaryButton className="gap-1 bg-cyan-600 hover:bg-cyan-500 focus:bg-cyan-700 active:bg-cyan-900 focus:ring-cyan-500">
                        <AdjustmentsHorizontalIcon className="h-4 w-4" />
                        <span>Filter</span>
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
