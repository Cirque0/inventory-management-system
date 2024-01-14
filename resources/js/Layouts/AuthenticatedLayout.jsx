import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import NavUserTag from '@/Components/NavUserTag';

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

                <NavUserTag user={user} />

                <div className="flex flex-col">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>

                    {user.role_id === 1 && (
                        <>
                            <ResponsiveNavLink href={route('accounts.show')} active={route().current('accounts.*')}>
                                Accounts
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href='#'>
                                Requests
                            </ResponsiveNavLink>
                        </>
                    )}

                    {user.role_id === 2 && (
                        <ResponsiveNavLink href='#'>
                            Your Requests
                        </ResponsiveNavLink>
                    )}

                    <ResponsiveNavLink href={route('items.show')} active={route().current('items.*')}>
                        Items
                    </ResponsiveNavLink>
                </div>
            </nav>

            <Dialog
                open={showingNavigationDropdown}
                onClose={() => setShowingNavigationDropdown(false)}
                className={'relative sm:hidden block z-50'}
            >
                <div className='fixed inset-0 overflow-y-auto bg-slate-800/50'>
                    <Dialog.Panel className={'h-screen flex flex-col mr-24 bg-white p-4 gap-4'}>
                        <Dialog.Title className={'flex justify-between align-baseline'}>
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>

                        </Dialog.Title>

                        <NavUserTag user={user} />

                        <div className="flex flex-col">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>

                            {user.role_id === 1 && (
                                <>
                                    <ResponsiveNavLink href={route('accounts.show')} active={route().current('accounts.*')}>
                                        Accounts
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href='#'>
                                        Requests
                                    </ResponsiveNavLink>
                                </>
                            )}

                            {user.role_id === 2 && (
                                <ResponsiveNavLink href='#'>
                                    Your Requests
                                </ResponsiveNavLink>
                            )}

                            <ResponsiveNavLink href='#'>
                                Items
                            </ResponsiveNavLink>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <main className='relative flex flex-col grow'>
                {header && (
                    <header className="sticky z-50 top-0 bg-white shadow">
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
