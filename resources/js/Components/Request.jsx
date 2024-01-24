import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { ArrowUturnLeftIcon, ChatBubbleLeftEllipsisIcon, CheckIcon, ClockIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
            <ClockIcon className="w-4 h-4" />
            <span className="sm:block hidden">Pending</span>
        </span>
    ),
    approved: (
        <span className="flex items-center gap-1 py-2 px-4 bg-green-300 text-green-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <CheckIcon className="w-4 h-4" />
            <span className="sm:block hidden">Approved</span>
        </span>
    ),
    denied: (
        <span className="flex items-center gap-1 py-2 px-4 bg-red-300 text-red-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <XMarkIcon className="w-4 h-4" />
            <span className="sm:block hidden">Denied</span>
        </span>
    ),
    returned: (
        <span className="flex items-center gap-1 py-2 px-4 bg-cyan-300 text-cyan-800 font-bold text-xs uppercase tracking-widest rounded-lg">
            <ArrowUturnLeftIcon className="w-4 h-4" />
            <span className="sm:block hidden">Returned</span>
        </span>
    ),
}

export default function Request({ request, isAdmin = false }) {
    const { data, setData, reset, patch, delete: destroy, processing, errors } = useForm({
        request_id: request.id,
        remarks: '',
    });
    const [confirmingApprove, setConfirmingApprove] = useState(false);
    const [confirmingDeny, setConfirmingDeny] = useState(false);
    const [confirmingReturn, setConfirmingReturn] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [confirmingCancel, setConfirmingCancel] = useState(false);
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

    const cancelRequest = () => {
        destroy(route('requests.cancel'), {
            onFinish: () => setConfirmingCancel(false),
        });
    }

    const deleteRequest = () => {
        patch(route('requests.delete'), {
            onFinish: () => setConfirmingDelete(false),
        });
    }

    const returnItem = () => {
        patch(route('requests.return'), {
            onFinish: () => setConfirmingReturn(false),
        });
    }

    return (
        <div className="flex flex-col p-4 bg-gray-50 rounded-lg">
            <span className="text-xs uppercase tracking-wider">
                {request.item.itemable_type}
            </span>
            <span className="font-bold">{request.item.type}</span>
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

            <div className="flex justify-between mt-4 gap-2 flex-wrap">
                <div className="flex gap-2">
                    {status[request.status]}
                </div>

                {request.status === 'pending' && (
                    isAdmin ? (
                        <div className="flex justify-end gap-2 flex-wrap">
                            <PrimaryButton onClick={() => setConfirmingApprove(true)} className="gap-1 bg-green-600 hover:bg-green-500 focus:bg-green-700 active:bg-green-900 focus:ring-green-500">
                                <CheckIcon className="h-4 w-4" />
                                <span className="sm:block hidden">Approve</span>
                            </PrimaryButton>
                            <DangerButton onClick={() => setConfirmingDeny(true)} className="gap-1">
                                <XMarkIcon className="h-4 w-4" />
                                <span className="sm:block hidden">Deny</span>
                            </DangerButton>
                        </div>
                    ) : (
                        <DangerButton className="gap-1" onClick={() => setConfirmingCancel(true)}>
                            <XMarkIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Cancel</span>
                        </DangerButton>
                    )
                )}

                {request.status !== 'pending' && (
                    <div className="flex gap-2 flex-wrap">
                        {(request.status === 'approved' && !isAdmin && request.item.itemable_type !== 'Office Supplies') && (
                            <PrimaryButton
                                className="gap-1 bg-cyan-600 hover:bg-cyan-500 focus:bg-cyan-700 active:bg-cyan-900 focus:ring-cyan-500"
                                onClick={() => setConfirmingReturn(true)}
                            >
                                <ArrowUturnLeftIcon className="h-4 w-4" />
                                <span className="sm:block hidden">Return</span>
                            </PrimaryButton>
                        )}
                        <SecondaryButton className="gap-1" onClick={() => setShowRemarks(true)}>
                            <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Remarks</span>
                        </SecondaryButton>
                        <DangerButton className="gap-1" onClick={() => setConfirmingDelete(true)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Delete</span>
                        </DangerButton>
                    </div>
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
                        Are you sure you want to deny this request?
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

            <Modal show={confirmingCancel} onClose={() => setConfirmingCancel(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to cancel this request?
                    </h2>

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={() => setConfirmingCancel(false)}>Cancel</SecondaryButton>

                        <DangerButton
                            className="gap-1"
                            onClick={cancelRequest}
                            disabled={processing}
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Cancel</span>
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <Modal show={confirmingDelete} onClose={() => setConfirmingDelete(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this request?
                    </h2>

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={() => setConfirmingDelete(false)}>Cancel</SecondaryButton>

                        <DangerButton
                            className="gap-1"
                            onClick={deleteRequest}
                            disabled={processing}
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Delete</span>
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <Modal show={confirmingReturn} onClose={() => setConfirmingReturn(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to return this item?
                    </h2>

                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={() => setConfirmingReturn(false)}>Cancel</SecondaryButton>

                        <PrimaryButton
                            className="gap-1 bg-cyan-600 hover:bg-cyan-500 focus:bg-cyan-700 active:bg-cyan-900 focus:ring-cyan-500"
                            onClick={returnItem}
                            disabled={processing}
                        >
                            <ArrowUturnLeftIcon className="h-4 w-4" />
                            <span className="sm:block hidden">Return</span>
                        </PrimaryButton>
                    </div>
                </div>
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
