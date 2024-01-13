import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateUserForm from './Partials/CreateUserForm';

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create an account</h2>}
        >
            <Head title={"Create an account"} />

            <div className="flex flex-col py-12 sm:px-24 px-4 gap-4">
                <div className='flex flex-col bg-white rounded-lg p-4 gap-4 shadow'>
                    <CreateUserForm className='max-w-xl' />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}