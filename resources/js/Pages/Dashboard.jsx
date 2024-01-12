import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/StatCard';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex flex-col py-12 sm:px-24 px-4 gap-4">
                <div className="flex sm:flex-row flex-col gap-4">
                    <StatCard>
                        <StatCard.Header>
                            Total Items
                        </StatCard.Header>
                        <StatCard.Content>
                            142
                        </StatCard.Content>
                    </StatCard>

                    <StatCard>
                        <StatCard.Header>
                            Total Categories
                        </StatCard.Header>
                        <StatCard.Content>
                            16
                        </StatCard.Content>
                    </StatCard>

                    <StatCard className='border-red-700'>
                        <StatCard.Header className={'text-red-700'}>
                            Out of Stock
                        </StatCard.Header>
                        <StatCard.Content>
                            4
                        </StatCard.Content>
                    </StatCard>
                </div>

                <div className='flex flex-col bg-white rounded-lg p-4 shadow'>
                    <span className='font-bold text-xl'>Unresolved Requests</span>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className="bg-gray-100 rounded h-40">1</div>
                        <div className="bg-gray-100 rounded h-40">2</div>
                        <div className="bg-gray-100 rounded h-40">3</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
