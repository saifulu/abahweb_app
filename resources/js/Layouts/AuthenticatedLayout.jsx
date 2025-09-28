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
    ArrowRightOnRectangleIcon,
    DocumentTextIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ user, header, children }) {
    const { flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: false },
        { name: 'Paket Hosting', href: route('admin.hosting-packages.index'), icon: ServerIcon, current: false },
        { name: 'Konten Homepage', href: route('admin.homepage-content.index'), icon: DocumentTextIcon, current: false },
        { name: 'Gambar', href: '#', icon: PhotoIcon, current: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-xl font-bold text-indigo-600">AbahWeb Admin</h1>
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
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UserIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={route('logout')}
                                method="post"
                                className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold text-indigo-600">AbahWeb Admin</h1>
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
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UserIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={route('logout')}
                                method="post"
                                className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1">
                            {header && (
                                <div className="flex items-center">
                                    {header}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-4 mt-4 rounded-md bg-green-50 p-4 sm:mx-6 lg:mx-8">
                        <div className="text-sm text-green-700">{flash.success}</div>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 mt-4 rounded-md bg-red-50 p-4 sm:mx-6 lg:mx-8">
                        <div className="text-sm text-red-700">{flash.error}</div>
                    </div>
                )}

                {/* Page content */}
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}