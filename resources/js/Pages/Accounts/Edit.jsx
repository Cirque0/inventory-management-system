import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ auth, account }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{account.name}</h2>}
        >
            <Head title={"Edit Account / " + account.name} />

            <div className="flex flex-col py-12 sm:px-24 px-4 gap-4">
                <div className='flex flex-col bg-white rounded-lg p-4 gap-4 shadow'>
                    <UpdateProfileInformationForm
                        account={account}
                        className="max-w-xl"
                    />
                </div>

                <div className='flex flex-col bg-white rounded-lg p-4 gap-4 shadow'>
                    <UpdatePasswordForm
                        account={account}
                        className="max-w-xl"
                    />
                </div>

                <div className='flex flex-col bg-white rounded-lg p-4 gap-4 shadow'>
                    <DeleteUserForm
                        account={account}
                        className="max-w-xl"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}