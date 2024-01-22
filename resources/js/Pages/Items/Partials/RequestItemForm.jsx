import { useRef, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { PlusIcon, MinusIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function RequestItemForm({ item, className = "" }) {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        item_id: item.id,
        quantity: 1,
    });

    const requestItem = (e) => {
        e.preventDefault();

        post(route('requests.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Request Item
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    How many of this item would you like to request?
                </p>
            </header>

            <form onSubmit={requestItem} className="flex gap-4">
                <div className="flex items-center gap-1">
                    <MinusIcon className="h-6 w-6 cursor-pointer" onClick={() => data.quantity > 0 && setData("quantity", data.quantity - 1)} />
                    <TextInput
                        id="quantity"
                        type="number"
                        className="max-w-32 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        required
                        min={1}
                    />
                    <PlusIcon className="h-6 w-6 cursor-pointer" onClick={() => data.quantity < item.quantity && setData("quantity", data.quantity + 1)} />
                </div>
                <PrimaryButton className="gap-1 bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 active:bg-indigo-900 focus:ring-indigo-500" onClick={() => setConfirmingDeletion(true)} disabled={processing}>
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>Request Item</span>
                </PrimaryButton>
            </form>

            <InputError className="mt-2" message={errors.item_id || errors.quantity} />
        </section>
    );
}
