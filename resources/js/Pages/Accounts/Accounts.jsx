import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Container from '@/Components/Container';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';

export default function Accounts({ auth, accounts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Accounts</h2>}
        >
            <Head title="Accounts" />

            <Container>
                <div>
                    <Link href={route('accounts.create')}>
                        <PrimaryButton className="gap-1 bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 active:bg-indigo-900 focus:ring-indigo-500">
                            <PlusIcon className='h-4 w-4' />
                            <span>Create an account</span>
                        </PrimaryButton>
                    </Link>
                </div>

                <div className='flex flex-col bg-white rounded-lg p-4 gap-4 shadow'>
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">All accounts</h2>
                    </header>

                    {accounts.length ? (
                        accounts.map((account) => <Account key={account.id} account={account} />)
                    ) : (
                        <span className='bg-gray-50 rounded-lg p-4 italic'>No accounts found.</span>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}

function Account({ account }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {
        delete: destroy,
        processing,
        errors,
    } = useForm({});

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('accounts.destroy', {id: account.id}), {
            preserveScroll: true,
        });
    }
    
    return (
        <div className="flex flex-col max-w-xl bg-gray-50 rounded-lg">
            <div className="flex flex-col p-4">
                <span className="font-bold">{account.name}</span>
                <span className="text-sm">{account.email}</span>

                <div className="flex justify-end mt-4 gap-2">
                    <Link href={route('accounts.edit', {id: account.id})}>
                        <SecondaryButton className='gap-1'>
                            <PencilIcon className='h-4 w-4' />
                            <span>Edit Account</span>
                        </SecondaryButton>
                    </Link>
                    <DangerButton className='gap-1' onClick={() => setConfirmDelete(true)}>
                        <TrashIcon className='h-4 w-4' />
                        <span>Delete Account</span>
                    </DangerButton>
                </div>

            </div>

            <Modal show={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once this account is deleted, all of its resources and data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setConfirmDelete(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3 gap-1" disabled={processing}>
                            <TrashIcon className='h-4 w-4' />
                            <span>Delete Account</span>
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}