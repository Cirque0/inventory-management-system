import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-center ps-3 pe-4 py-2 gap-2 border-l-4 ${
                active
                    ? 'border-yellow-400 text-indigo-700 bg-yellow-50 focus:text-indigo-800 focus:bg-yellow-100 focus:border-yellow-700'
                    : 'border-transparent text-yellow-100 hover:text-indigo-800 hover:bg-yellow-50 hover:border-yellow-300 focus:text-indigo-800 focus:bg-yellow-50 focus:border-yellow-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
