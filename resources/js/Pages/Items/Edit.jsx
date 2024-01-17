import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import UpdateItemForm from "./Partials/UpdateItemForm";
import DeleteItemForm from "./Partials/DeleteItemForm";

export default function Edit({ auth, item }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Item Details</h2>}
        >
            <Head title="View Item Details" />
            <Container>
                <Card>
                    <UpdateItemForm
                        className="max-w-xl"
                        item={item}
                    />
                </Card>
                <Card>
                    <DeleteItemForm className="max-w-xl" item={item} />
                </Card>
            </Container>
        </Authenticated>
    )
}