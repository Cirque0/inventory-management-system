import Combobox from "@/Components/Combobox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";

export default function PrintForm({ categories, show, onClose }) {
    const { data, setData, get, errors } = useForm({
        category: route().params.category || 'All',
    });

    const searchItems = (e) => {
        e.preventDefault();

        get(route('items.print'));
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={searchItems} className="p-6 space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Print list of items
                </h2>

                <div>
                    <InputLabel value="Select a category to print" required />

                    <Combobox
                        value={data.category}
                        onChange={(value) => setData('category', value)}
                        className="mt-1 block w-full"
                        options={['All', ...categories]}
                    />

                    <InputError className="mt-2" message={errors.category} />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                    <a href={route('items.print', data)}>
                        <PrimaryButton type={'button'} className="gap-1 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 active:bg-blue-900 focus:ring-blue-500">
                            <PrinterIcon className="h-4 w-4" />
                            <span>Print</span>
                        </PrimaryButton>
                    </a>
                </div>
            </form>
        </Modal>
    );
}
