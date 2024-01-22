import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import Item from "@/Components/Item";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Container from "@/Components/Container";
import { useState } from "react";
import FilterItemForm from "./Partials/FilterItemForm";
import StatCard from "@/Components/StatCard";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Items({ auth, items, categories, total_items, total_categories, total_out_of_stock }) {
    const [showFilter ,setShowFilter] = useState(false);
    const category = route().params.category;

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Items</h2>}
        >
            <Head title="Items" />
            <Container>
                <div className="flex gap-2">
                    {auth.user.role_id === 1 && (
                            <Link href={route('items.create')}>
                                <PrimaryButton className="gap-1 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 active:bg-blue-900 focus:ring-blue-500">
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Add an item</span>
                                </PrimaryButton>
                            </Link>
                    )}
                    <SecondaryButton onClick={() => setShowFilter(true)}>
                        <MagnifyingGlassIcon className="h-4 w-4" />
                        <span>Search</span>
                    </SecondaryButton>
                </div>

                <div className="flex sm:flex-row flex-col gap-4">
                    <StatCard>
                        <StatCard.Header>
                            Total Items
                        </StatCard.Header>
                        <StatCard.Content>
                            {total_items}
                        </StatCard.Content>
                    </StatCard>

                    {(!category || category === 'All') && (
                        <StatCard>
                            <StatCard.Header>
                                Total Categories
                            </StatCard.Header>
                            <StatCard.Content>
                                {total_categories}
                            </StatCard.Content>
                        </StatCard>
                    )}

                    {(!category || category === 'All' || category === 'Office Supplies') && (
                        <StatCard className='border-red-700'>
                            <StatCard.Header className={'text-red-700'}>
                                Out of Stock
                            </StatCard.Header>
                            <StatCard.Content>
                                {total_out_of_stock}
                            </StatCard.Content>
                        </StatCard>
                    )}
                </div>
                
                <Card>
                    <Card.Header>
                        {category ? (
                            category === 'All' ? 'All Items' : category
                        ) : 'All Items'}
                    </Card.Header>

                    {route().params.query && (
                        <Card.Header>
                            Search results for "{route().params.query}"
                        </Card.Header>
                    )}

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                        {items.length ? (
                            items.map((item) => <Item key={item.id} item={item} />)
                        ) : (
                            <span className='bg-gray-50 rounded-lg p-4 italic'>No items found.</span>
                        )}
                    </div>
                </Card>

                <FilterItemForm categories={categories} show={showFilter} onClose={() => setShowFilter(false)} />
            </Container>
        </Authenticated>
    )
}