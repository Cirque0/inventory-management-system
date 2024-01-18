import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";

const status = {
    pending: (
        <span className="flex items-center gap-1 py-2 px-4 bg-amber-300 text-amber-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <ClockIcon className="w-4 h-4" /> Pending
        </span>
    ),
    approved: (
        <span className="flex items-center gap-1 py-2 px-4 bg-green-300 text-green-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <CheckIcon className="w-4 h-4" /> Approved
        </span>
    ),
    denied: (
        <span className="flex items-center gap-1 py-2 px-4 bg-red-300 text-red-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <XMarkIcon className="w-4 h-4" /> Denied
        </span>
    ),
}

export default function Request({ request, isAdmin = false }) {
    const {patch, processing, errors} = useForm({
        request_id: request.id,
    });

    const approve = () => {
        patch(route('requests.approve'));
    }

    const deny = () => {
        patch(route('requests.deny'));
    }

    return (
        <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
            <span className="text-xs uppercase tracking-wider">
                {request.item.itemable_type}
            </span>
            <span className="font-bold">{request.item.name}</span>
            <span className="text-sm">
                Requested by{" "}
                <span className="font-bold">{request.requester.name}</span>
            </span>
            <span className="text-sm">Requested Quantity: <span className="font-bold">{request.quantity} unit</span></span>
            <span className="text-sm">
                {new Date(request.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}{" "}
            </span>

            <div className="flex justify-between mt-4">
                {status[request.status]}

                {(isAdmin && request.status === 'pending') && (
                    <div className="flex justify-end gap-2">
                        <PrimaryButton onClick={approve} className="bg-green-600 hover:bg-green-500 focus:bg-green-700 active:bg-green-900 focus:ring-green-500" disabled={processing}>
                            <CheckIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Approve</span>
                        </PrimaryButton>
                        <DangerButton onClick={deny} disabled={processing}>
                            <XMarkIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Deny</span>
                        </DangerButton>
                    </div>
                )}
            </div>
            
            <div className="flex justify-end">
                <InputError className="mt-2" message={errors.request_id} />
            </div>
        </div>
    );
}
