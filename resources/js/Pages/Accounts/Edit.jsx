import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import Container from '@/Components/Container';

export default function Edit({ auth, account }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">{account.name}</h2>}
        >
            <Head title={"Edit Account / " + account.name} />

            <Container>
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
            </Container>
        </AuthenticatedLayout>
    )
}