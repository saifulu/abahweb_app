import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    PlusIcon, 
    EyeIcon, 
    PencilIcon, 
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, logos }) {
    const [deleteId, setDeleteId] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        destroy(route('admin.logos.destroy', id), {
            onSuccess: () => setDeleteId(null)
        });
    };

    const getTypeLabel = (type) => {
        const types = {
            main: 'Logo Utama',
            secondary: 'Logo Sekunder',
            favicon: 'Favicon',
            footer: 'Footer',
            header: 'Header',
            dark: 'Mode Gelap',
            light: 'Mode Terang'
        };
        return types[type] || type;
    };

    const getTypeBadgeColor = (type) => {
        const colors = {
            main: 'bg-blue-100 text-blue-800',
            secondary: 'bg-green-100 text-green-800',
            favicon: 'bg-purple-100 text-purple-800',
            footer: 'bg-gray-100 text-gray-800',
            header: 'bg-indigo-100 text-indigo-800',
            dark: 'bg-gray-900 text-white',
            light: 'bg-yellow-100 text-yellow-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Logo
                    </h2>
                    <Link
                        href={route('admin.logos.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Tambah Logo</span>
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Logo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {logos.length === 0 ? (
                                <div className="text-center py-12">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada logo</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Mulai dengan menambahkan logo pertama untuk website Anda.
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('admin.logos.create')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                            Tambah Logo
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {logos.map((logo) => (
                                        <div key={logo.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                            {/* Logo Preview */}
                                            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-t-lg p-4 flex items-center justify-center">
                                                <img
                                                    src={logo.url}
                                                    alt={logo.name}
                                                    className="max-h-24 max-w-full object-contain"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden items-center justify-center h-24 text-gray-400">
                                                    <PhotoIcon className="h-8 w-8" />
                                                </div>
                                            </div>

                                            {/* Logo Info */}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                        {logo.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-1 ml-2">
                                                        {logo.is_active ? (
                                                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <XCircleIcon className="h-5 w-5 text-red-500" />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(logo.type)}`}>
                                                        {getTypeLabel(logo.type)}
                                                    </span>
                                                    
                                                    <div className="text-sm text-gray-600">
                                                        <p><span className="font-medium">File:</span> {logo.file_name}</p>
                                                        {logo.formatted_size && (
                                                            <p><span className="font-medium">Ukuran:</span> {logo.formatted_size}</p>
                                                        )}
                                                        {logo.width && logo.height && (
                                                            <p><span className="font-medium">Dimensi:</span> {logo.width} × {logo.height}px</p>
                                                        )}
                                                    </div>

                                                    {logo.description && (
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {logo.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={route('admin.logos.show', logo.id)}
                                                            className="text-blue-600 hover:text-blue-800 p-1"
                                                            title="Lihat Detail"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.logos.edit', logo.id)}
                                                            className="text-green-600 hover:text-green-800 p-1"
                                                            title="Edit"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                    <button
                                                        onClick={() => setDeleteId(logo.id)}
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Hapus"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <TrashIcon className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Hapus Logo</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Apakah Anda yakin ingin menghapus logo ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                            <div className="flex items-center justify-center space-x-4 mt-4">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    disabled={processing}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteId)}
                                    className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Menghapus...' : 'Hapus'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}