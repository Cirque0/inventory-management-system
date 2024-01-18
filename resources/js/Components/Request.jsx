import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { ChatBubbleLeftEllipsisIcon, CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import { useState } from "react";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import InputLabel from "./InputLabel";
import TextArea from "./TextArea";

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
    const { data, setData, reset, patch, processing, errors } = useForm({
        request_id: request.id,
        remarks: '',
    });
    const [confirmingApprove, setConfirmingApprove] = useState(false);
    const [confirmingDeny, setConfirmingDeny] = useState(false);
    const [showRemarks, setShowRemarks] = useState(false);

    const closeApproveModal = () => {
        setConfirmingApprove(false);
        reset();
    }

    const closeDenyModal = () => {
        setConfirmingDeny(false);
        reset();
    }

    const approve = () => {
        patch(route('requests.approve'), {
            onFinish: () => closeApproveModal(),
        });
    }

    const deny = () => {
        patch(route('requests.deny'), {
            onFinish: () => closeDenyModal(),
        });
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
                        <PrimaryButton onClick={() => setConfirmingApprove(true)} className="gap-1 bg-green-600 hover:bg-green-500 focus:bg-green-700 active:bg-green-900 focus:ring-green-500">
                            <CheckIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Approve</span>
                        </PrimaryButton>
                        <DangerButton onClick={() => setConfirmingDeny(true)} className="gap-1">
                            <XMarkIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Deny</span>
                        </DangerButton>
                    </div>
                )}

                {request.status !== 'pending' && (
                    <SecondaryButton className="gap-1" onClick={() => setShowRemarks(true)}>
                        <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                        Remarks
                    </SecondaryButton>
                )}
            </div>
            
            <div className="flex justify-end">
                <InputError className="mt-2" message={errors.request_id} />
            </div>

            <Modal show={confirmingApprove} onClose={closeApproveModal}>
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to approve this request?
                    </h2>

                    <InputLabel htmlFor={'remarks'} value={'Remarks (optional):'} />
                    <TextArea
                        id='remarks'
                        className={'w-full resize-none'}
                        value={data.remarks}
                        onChange={(e) => setData('remarks', e.target.value)}
                    />
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Once this account is deleted, all of its resources and data will be permanently deleted.
                    </p> */}

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={closeApproveModal}>Cancel</SecondaryButton>

                        <PrimaryButton onClick={approve} className="gap-1 bg-green-600 hover:bg-green-500 focus:bg-green-700 active:bg-green-900 focus:ring-green-500" disabled={processing}>
                            <CheckIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Approve</span>
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={confirmingDeny} onClose={closeDenyModal}>
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to approve this request?
                    </h2>

                    <InputLabel htmlFor={'remarks'} value={'Remarks (optional):'} />
                    <TextArea
                        id='remarks'
                        className={'w-full resize-none'}
                        value={data.remarks}
                        onChange={(e) => setData('remarks', e.target.value)}
                    />
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Once this account is deleted, all of its resources and data will be permanently deleted.
                    </p> */}

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={closeDenyModal}>Cancel</SecondaryButton>

                        <DangerButton className="gap-1" onClick={deny} disabled={processing}>
                            <XMarkIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Deny</span>
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            <Modal show={showRemarks} onClose={() => setShowRemarks(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Remarks
                    </h2>

                    <span>{request.remarks || 'No remarks.'}</span>

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={() => setShowRemarks(false)}>Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
