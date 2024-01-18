import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import Item from "@/Components/Item";
import PrimaryButton from "@/Components/PrimaryButton";
import Container from "@/Components/Container";
import Request from "@/Components/Request";

export default function Items({ auth, requests }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Requests</h2>}
        >
            <Head title="Requests" />
            <Container>
                <Card>
                    <Card.Header>{auth.user.role_id === 1 ? "All Requests" : "Your Requests"}</Card.Header>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                        {requests.map((request) => (
                            <Request key={request.id} request={request} isAdmin={auth.user.role_id == 1} />
                        ))}
                    </div>
                </Card>
            </Container>
        </Authenticated>
    )
}