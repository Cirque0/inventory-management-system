import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen relative flex bg-gray-100">
            <nav className="sticky top-0 z-50 w-full max-w-64 h-screen hidden sm:flex flex-col p-4 gap-4 bg-white border-b border-gray-100 shadow">
                <div className='flex justify-between align-baseline'>
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>

                </div>

                <div className="flex flex-col gap-2">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="w-full flex justify-end rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <span className='line-clamp-1'>{user.name}</span>

                                    <svg
                                        className="ms-2 -me-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </NavLink>

                    {user.role_id === 1 && (
                        <NavLink href='#'>
                            Requests
                        </NavLink>
                    )}
                </div>
            </nav>

            <Dialog
                open={showingNavigationDropdown}
                onClose={() => setShowingNavigationDropdown(false)}
                className={'relative sm:hidden block z-50'}
            >
                <div className='fixed inset-0 overflow-y-auto bg-slate-800/50'>
                    <Dialog.Panel className={'h-screen flex flex-col mr-24 bg-gray-100 p-4 gap-4'}>
                        <Dialog.Title className={'flex justify-between align-baseline'}>
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>

                        </Dialog.Title>

                        <div className="flex flex-col gap-2">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="w-full flex justify-end rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <span className='line-clamp-1'>{user.name}</span>

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>

                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>

                            {user.role_id === 1 && (
                                <ResponsiveNavLink href='#'>
                                    Requests
                                </ResponsiveNavLink>
                            )}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <main className='relative flex flex-col grow'>
                {header && (
                    <header className="sticky top-0 bg-white shadow">
                        <div className="flex items-center bg-white max-w-7xl mx-auto sm:py-6 py-4 px-4 sm:px-6 lg:px-8 gap-2">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <Bars3Icon className='h-6 w-6' />
                            </button>
                            {header}
                        </div>
                    </header>
                )}
                
                {children}
            </main>
        </div>
    );
}
