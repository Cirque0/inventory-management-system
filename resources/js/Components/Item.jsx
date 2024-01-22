import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";
import { Link } from "@inertiajs/react";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Item({ item }) {
    return (
        <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
            <span className="text-xs uppercase tracking-wider">
                {item.itemable_type}
            </span>
            <span className="font-bold">{item.type}</span>
            <span className="text-sm">
                Acquired{" "}
                {new Date(item.acquisition_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}{" "}
                @ Php {item.acquisition_cost.toLocaleString()}
            </span>
            <span className="text-sm">Source: {item.source}</span>
            <span className="text-sm">Status: {item.status}</span>
            <div className="flex flex-col mt-4">
                <span className="text-sm font-bold">
                    {item.quantity} in stock
                </span>
                <span className="text-sm font-bold">
                    Php {item.value.toLocaleString()}
                </span>
            </div>

            <div className="flex justify-end mt-4 gap-2">
                <Link
                    href={route("items.edit", { id: item.id })}
                    preserveScroll
                >
                    <SecondaryButton className="gap-1">
                        <EyeIcon className="h-4 w-4" />
                        <span>View</span>
                    </SecondaryButton>
                </Link>
            </div>
        </div>
    );
}
