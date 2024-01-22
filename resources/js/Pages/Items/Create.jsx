import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import CreateItemForm from "./Partials/CreateItemForm";

export default function Create({ auth, categories }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Add an Item</h2>}
        >
            <Head title="Add an Item" />
            <Container>
                <Card>
                    <CreateItemForm
                        className="max-w-xl"
                        categories={categories}
                    />
                </Card>
            </Container>
        </Authenticated>
    )
}