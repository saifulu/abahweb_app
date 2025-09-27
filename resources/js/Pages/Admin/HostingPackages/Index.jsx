import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, packages }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket hosting ini?')) {
            setProcessing(true);
            router.delete(route('admin.hosting-packages.destroy', id), {
                onFinish: () => setProcessing(false)
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    const getBadgeColor = (badge) => {
        switch (badge?.toLowerCase()) {
            case 'popular':
                return 'bg-blue-100 text-blue-800';
            case 'recommended':
                return 'bg-green-100 text-green-800';
            case 'best value':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Paket Hosting</h2>
                    <Link
                        href={route('admin.hosting-packages.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Tambah Paket</span>
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Paket Hosting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {packages.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Paket
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Harga
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Spesifikasi
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {packages.map((package_item) => (
                                                <tr key={package_item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {package_item.name}
                                                                    </div>
                                                                    {package_item.badge && (
                                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(package_item.badge)}`}>
                                                                            {package_item.badge}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {package_item.description.substring(0, 100)}...
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            Rp {formatPrice(package_item.price)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            / {package_item.billing_cycle === 'monthly' ? 'bulan' : 'tahun'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {package_item.storage_gb}GB Storage
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {package_item.bandwidth_gb}GB Bandwidth
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {package_item.domains} Domain(s)
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            package_item.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {package_item.is_active ? (
                                                                <>
                                                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                                                    Aktif
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                                                    Nonaktif
                                                                </>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('admin.hosting-packages.show', package_item.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="Lihat Detail"
                                                            >
                                                                <EyeIcon className="h-5 w-5" />
                                                            </Link>
                                                            <Link
                                                                href={route('admin.hosting-packages.edit', package_item.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                                title="Edit"
                                                            >
                                                                <PencilIcon className="h-5 w-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(package_item.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                                disabled={processing}
                                                                title="Hapus"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada paket hosting</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Mulai dengan membuat paket hosting pertama Anda.
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('admin.hosting-packages.create')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <PlusIcon className="h-5 w-5 mr-2" />
                                            Tambah Paket Hosting
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}