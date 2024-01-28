import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { ArchiveBoxIcon, Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import NavUserTag from '@/Components/NavUserTag';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen relative flex bg-temple">
            <nav className="sticky top-0 z-50 w-full max-w-64 h-screen hidden sm:flex flex-col p-4 gap-4 bg-blue-500 border-b border-blue-100 shadow">
                <div className='flex justify-between align-baseline'>
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                    </Link>

                </div>

                <NavUserTag user={user} />

                <div className="flex flex-col">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <HomeIcon className='h-4 w-4' />
                        Dashboard
                    </ResponsiveNavLink>

                    {user.role_id === 1 && (
                        <>
                            <ResponsiveNavLink href={route('accounts.show')} active={route().current('accounts.*')}>
                                <UsersIcon className='h-4 w-4' />
                                Accounts
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('requests.show')} active={route().current('requests.show')}>
                                <ChatBubbleLeftIcon className='h-4 w-4' />
                                Requests
                            </ResponsiveNavLink>
                        </>
                    )}

                    {user.role_id === 2 && (
                        <ResponsiveNavLink href={route('requests.show')} active={route().current('requests.show')}>
                            <ChatBubbleLeftIcon className='h-4 w-4' />
                            Your Requests
                        </ResponsiveNavLink>
                    )}
                    
                    <ResponsiveNavLink href={route('requests.show_borrow')} active={route().current('requests.show_borrow')}>
                        <ChatBubbleLeftIcon className='h-4 w-4' />
                        Borrow Requests
                    </ResponsiveNavLink>

                    <ResponsiveNavLink href={route('items.show')} active={route().current('items.*')}>
                        <ArchiveBoxIcon className='h-4 w-4' />
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
                    <Dialog.Panel className={'h-screen flex flex-col mr-24 bg-blue-500 p-4 gap-4'}>
                        <Dialog.Title className={'flex justify-between align-baseline'}>
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                            </Link>

                        </Dialog.Title>

                        <NavUserTag user={user} />

                        <div className="flex flex-col">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                <HomeIcon className='h-4 w-4' />
                                Dashboard
                            </ResponsiveNavLink>

                            {user.role_id === 1 && (
                                <>
                                    <ResponsiveNavLink href={route('accounts.show')} active={route().current('accounts.*')}>
                                        <UsersIcon className='h-4 w-4' />
                                        Accounts
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('requests.show')} active={route().current('requests.show')}>
                                        <ChatBubbleLeftIcon className='h-4 w-4' />
                                        Requests
                                    </ResponsiveNavLink>
                                </>
                            )}

                            {user.role_id === 2 && (
                                <ResponsiveNavLink href={route('requests.show')} active={route().current('requests.show')}>
                                    <ChatBubbleLeftIcon className='h-4 w-4' />
                                    Your Requests
                                </ResponsiveNavLink>
                            )}

                            <ResponsiveNavLink href={route('requests.show_borrow')} active={route().current('requests.show_borrow')}>
                                <ChatBubbleLeftIcon className='h-4 w-4' />
                                Borrow Requests
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('items.show')} active={route().current('items.*')}>
                                <ArchiveBoxIcon className='h-4 w-4' />
                                Items
                            </ResponsiveNavLink>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <main className='relative flex flex-col grow'>
                {header && (
                    <header className="sticky z-50 top-0 bg-indigo-500 shadow">
                        <div className="flex items-center bg-indigo-500 max-w-7xl mx-auto sm:py-6 py-4 px-4 sm:px-6 lg:px-8 gap-2">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <Bars3Icon className='h-6 w-6 text-white' />
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
