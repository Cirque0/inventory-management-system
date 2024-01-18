import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/StatCard';
import Card from '@/Components/Card';
import Request from '@/Components/Request';

export default function Dashboard({ auth, pending_requests, total_items, total_categories, total_out_of_stock }) {
    const isAdmin = auth.user.role_id === 1;

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
                            {total_items}
                        </StatCard.Content>
                    </StatCard>

                    <StatCard>
                        <StatCard.Header>
                            Total Categories
                        </StatCard.Header>
                        <StatCard.Content>
                            {total_categories}
                        </StatCard.Content>
                    </StatCard>

                    <StatCard className='border-red-700'>
                        <StatCard.Header className={'text-red-700'}>
                            Out of Stock
                        </StatCard.Header>
                        <StatCard.Content>
                            {total_out_of_stock}
                        </StatCard.Content>
                    </StatCard>
                </div>

                {isAdmin && (
                    <Card>
                        <Card.Header>Pending requests</Card.Header>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                            {pending_requests.length ? (
                                pending_requests.map((request) => (
                                    <Request key={request.id} request={request} isAdmin={isAdmin} />
                                ))
                            ) : (
                                <span className="italic">There are no pending requests right now.</span>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
