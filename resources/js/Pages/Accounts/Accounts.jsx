import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CreateUserForm from './Partials/CreateUserForm';

export default function Accounts({ auth, accounts }) {
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts</h2>}
        >
            <Head title="Accounts" />

            <div className="flex flex-col py-12 sm:px-24 px-4 gap-4">

                <Link href={route('accounts.create')}>
                    <PrimaryButton>Create an account</PrimaryButton>
                </Link>

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
            </div>
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
        <div className="flex flex-col bg-gray-50 rounded-lg">
            <div className="flex">
                <span className="flex justify-end items-center w-20 p-4 font-bold">
                    {account.id}
                </span>
                <div className="flex flex-col p-4">
                    <span className="font-bold">{account.name}</span>
                    <span className="text-sm">{account.email}</span>

                    <div className="flex mt-4 gap-2">
                        <Link href={route('accounts.edit', {id: account.id})}>
                            <SecondaryButton>Edit Account</SecondaryButton>
                        </Link>
                        <DangerButton onClick={() => setConfirmDelete(true)}>Delete Account</DangerButton>
                    </div>

                </div>
            </div>

            {confirmDelete && (
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-right text-lg font-medium text-gray-900">
                        Are you sure you want to delete this account?
                    </h2>

                    <p className="mt-1 text-right text-sm text-gray-600">
                        Once this account is deleted, all of its resources and data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setConfirmDelete(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Yes
                        </DangerButton>
                    </div>
                </form>
            )}
        </div>
    );
}