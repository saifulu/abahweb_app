import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    ServerIcon, 
    GlobeAltIcon, 
    UserGroupIcon, 
    CogIcon,
    Bars3Icon,
    XMarkIcon,
    UserIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
        { name: 'Hosting Services', href: '/hosting', icon: ServerIcon, current: false },
        { name: 'Tunneling Services', href: '/tunneling', icon: GlobeAltIcon, current: false },
    ];

    const adminNavigation = [
        { name: 'Users Management', href: '/admin/users', icon: UserGroupIcon, current: false },
        { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-xl font-bold text-indigo-600">AbahWeb</h1>
                        <button onClick={() => setSidebarOpen(false)}>
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                        {auth.user.role === 'admin' && (
                            <>
                                <div className="border-t border-gray-200 my-4"></div>
                                {adminNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <item.icon className="mr-3 h-6 w-6" />
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold text-indigo-600">AbahWeb</h1>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                        {auth.user.role === 'admin' && (
                            <>
                                <div className="border-t border-gray-200 my-4"></div>
                                {adminNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <item.icon className="mr-3 h-6 w-6" />
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top navigation */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1"></div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Profile dropdown */}
                            <div className="relative">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                        <UserIcon className="h-8 w-8 rounded-full bg-gray-300 p-1" />
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">{auth.user.name}</p>
                                            <p className="text-gray-500">{auth.user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flash messages */}
                {flash.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mx-4 mt-4">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mx-4 mt-4">
                        {flash.error}
                    </div>
                )}

                {/* Page content */}
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {title && (
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                    {title}
                                </h1>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}