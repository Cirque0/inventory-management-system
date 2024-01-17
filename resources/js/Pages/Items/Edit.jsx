import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import UpdateItemForm from "./Partials/UpdateItemForm";
import DeleteItemForm from "./Partials/DeleteItemForm";
import ItemDetails from "./Partials/ItemDetails";
import RequestItemForm from "./Partials/RequestItemForm";

export default function Edit({ auth, item }) {
    const {id, created_at, updated_at, ...itemable } = item.itemable;

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Item Details</h2>}
        >
            <Head title="View Item Details" />
            <Container>
                <ItemDetails item={item} />

                {auth.user.role_id === 2 && (
                    <Card>
                        <RequestItemForm item={item} />
                    </Card>
                )}

                {auth.user.role_id === 1 && (
                    <>
                        <Card>
                            <UpdateItemForm
                                className="max-w-xl"
                                item={item}
                            />
                        </Card>
                        <Card>
                            <DeleteItemForm className="max-w-xl" item={item} />
                        </Card>
                    </>
                )}
            </Container>
        </Authenticated>
    )
}