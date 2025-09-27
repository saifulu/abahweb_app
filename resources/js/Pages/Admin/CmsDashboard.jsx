import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ServerIcon, 
    DocumentTextIcon, 
    ChartBarIcon,
    PlusIcon,
    EyeIcon,
    PencilIcon
} from '@heroicons/react/24/outline';

export default function CmsDashboard({ auth, stats, recent_packages, recent_contents }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CMS Dashboard</h2>}
        >
            <Head title="CMS Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ServerIcon className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Paket Hosting</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.hosting_packages}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ChartBarIcon className="h-8 w-8 text-green-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Paket Aktif</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.active_packages}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <DocumentTextIcon className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Konten</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.homepage_contents}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <EyeIcon className="h-8 w-8 text-orange-500" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Konten Aktif</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.active_contents}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Kelola Paket Hosting</h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route('admin.hosting-packages.index')}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-700">Lihat Semua Paket</span>
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    </Link>
                                    <Link
                                        href={route('admin.hosting-packages.create')}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-700">Tambah Paket Baru</span>
                                        <PlusIcon className="h-5 w-5 text-gray-400" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Kelola Konten Homepage</h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route('admin.homepage-content.index')}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-700">Lihat Semua Konten</span>
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    </Link>
                                    <Link
                                        href={route('admin.homepage-content.create')}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-700">Tambah Konten Baru</span>
                                        <PlusIcon className="h-5 w-5 text-gray-400" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Items */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Paket Hosting Terbaru</h3>
                                <div className="space-y-3">
                                    {recent_packages.length > 0 ? (
                                        recent_packages.map((package_item) => (
                                            <div key={package_item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{package_item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        Rp {new Intl.NumberFormat('id-ID').format(package_item.price)} / {package_item.billing_cycle === 'monthly' ? 'bulan' : 'tahun'}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('admin.hosting-packages.edit', package_item.id)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">Belum ada paket hosting.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Konten Homepage Terbaru</h3>
                                <div className="space-y-3">
                                    {recent_contents.length > 0 ? (
                                        recent_contents.map((content) => (
                                            <div key={content.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{content.title || content.key}</p>
                                                    <p className="text-xs text-gray-500">{content.section}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('admin.homepage-content.edit', content.id)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">Belum ada konten homepage.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}