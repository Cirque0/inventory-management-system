import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import UpdateItemForm from "./Partials/UpdateItemForm";

export default function Edit({ auth, item }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Item Details</h2>}
        >
            <Head title="Add an Item" />
            <Container>
                <Card>
                    <UpdateItemForm
                        className="max-w-xl"
                        item={item}
                    />
                </Card>
            </Container>
        </Authenticated>
    )
}