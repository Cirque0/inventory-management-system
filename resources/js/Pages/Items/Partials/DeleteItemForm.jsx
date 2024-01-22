import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteItemForm({ item, className = '' }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('items.destroy', {id: item.id}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Delete Item</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once this item is deleted, all of its resources and data will be permanently deleted. Before
                    deleting this account, please download any data or information that you wish to retain.
                </p>
            </header>

            <DangerButton className='gap-1' onClick={() => setConfirmingDeletion(true)}>
                <TrashIcon className='h-4 w-4' />
                <span>Delete Item</span>
            </DangerButton>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this item?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once this item is deleted, all of its resources and data will be permanently deleted.
                    </p>
                    
                    <InputError className="mt-2" message={errors.id} />

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3 gap-1" disabled={processing}>
                            <TrashIcon className='h-4 w-4' />
                            <span>Delete Item</span>
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
