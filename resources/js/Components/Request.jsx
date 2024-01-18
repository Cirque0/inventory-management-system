import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Request({ request, isAdmin = false }) {
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
                <span className="flex items-center gap-1 p-1 bg-amber-300 text-amber-800 font-bold text-xs uppercase tracking-widest rounded-lg">
                    <ClockIcon className="w-4 h-4" /> Pending
                </span>
                {isAdmin && (
                    <div className="flex justify-end gap-1">
                        <PrimaryButton className="bg-green-600 hover:bg-green-500 active:bg-green-700">
                            Approve
                        </PrimaryButton>
                        <DangerButton>
                            Deny
                        </DangerButton>
                    </div>
                )}
            </div>
        </div>
    );
}
