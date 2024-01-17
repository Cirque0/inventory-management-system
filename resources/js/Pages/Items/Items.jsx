import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import Item from "@/Components/Item";
import PrimaryButton from "@/Components/PrimaryButton";
import Container from "@/Components/Container";

export default function Items({ auth, items }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Items</h2>}
        >
            <Head title="Items" />
            <Container>
                <div>
                    <Link href={route('items.create')}>
                        <PrimaryButton>Add an item</PrimaryButton>
                    </Link>
                </div>
                
                <Card>
                    <Card.Header>All Items</Card.Header>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                        {items.length ? (
                            items.map((item) => <Item key={item.id} item={item} />)
                        ) : (
                            <span className='bg-gray-50 rounded-lg p-4 italic'>No items found.</span>
                        )}
                    </div>
                </Card>
            </Container>
        </Authenticated>
    )
}