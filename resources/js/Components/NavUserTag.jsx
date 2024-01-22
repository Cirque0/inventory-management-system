import { useState } from "react";
import { UserIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function NavUserTag({ user }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <span className="w-full flex justify-end rounded-md">
                <button
                    type="button"
                    className="w-full inline-flex justify-between items-center px-3 py-2 border border-transparent text-base leading-4 font-medium rounded-md text-indigo-500 bg-indigo-50 hover:text-indigo-700 focus:outline-none transition ease-in-out duration-150"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <span className="flex gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span className="line-clamp-1">{user.name}</span>
                    </span>

                    {showOptions ? (
                        <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                    )}

                </button>
            </span>

            <div className={`${showOptions ? 'flex' : 'hidden'} flex-col bg-indigo-50 rounded-md overflow-hidden`}>
                <DropdownLink href={route('profile.edit')}>Profile</DropdownLink>
                <DropdownLink href={route('logout')} method="post" as="button" className={'text-red-500'}>Log Out</DropdownLink>
            </div>
        </div>
    );
}

function DropdownLink({ className, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-base leading-5 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    )
}