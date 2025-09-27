import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Show({ auth, logo }) {
    const getTypeLabel = (type) => {
        const typeLabels = {
            'main': 'Logo Utama',
            'secondary': 'Logo Sekunder',
            'favicon': 'Favicon',
            'footer': 'Footer',
            'header': 'Header',
            'dark': 'Mode Gelap',
            'light': 'Mode Terang'
        };
        return typeLabels[type] || type;
    };

    const getTypeColor = (type) => {
        const typeColors = {
            'main': 'bg-blue-100 text-blue-800',
            'secondary': 'bg-green-100 text-green-800',
            'favicon': 'bg-purple-100 text-purple-800',
            'footer': 'bg-gray-100 text-gray-800',
            'header': 'bg-indigo-100 text-indigo-800',
            'dark': 'bg-gray-900 text-white',
            'light': 'bg-yellow-100 text-yellow-800'
        };
        return typeColors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('admin.logos.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail Logo: {logo.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin.logos.edit', logo.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Detail Logo: ${logo.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Logo Preview */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Logo</h3>
                                <div className="border rounded-lg p-8 bg-gray-50 text-center">
                                    <img
                                        src={logo.url}
                                        alt={logo.name}
                                        className="mx-auto max-h-48 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="hidden">
                                        <PhotoIcon className="mx-auto h-24 w-24 text-gray-400" />
                                        <p className="mt-2 text-gray-500">Logo tidak dapat dimuat</p>
                                    </div>
                                </div>
                            </div>

                            {/* Logo Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Informasi Dasar</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">ID</label>
                                        <p className="mt-1 text-sm text-gray-900">{logo.id}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                                        <p className="mt-1 text-sm text-gray-900">{logo.name}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tipe</label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(logo.type)}`}>
                                            {getTypeLabel(logo.type)}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            logo.is_active 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {logo.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </div>

                                    {logo.description && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                            <p className="mt-1 text-sm text-gray-900">{logo.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* File Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Informasi File</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama File</label>
                                        <p className="mt-1 text-sm text-gray-900">{logo.file_name}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ukuran File</label>
                                        <p className="mt-1 text-sm text-gray-900">{logo.formatted_size}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tipe MIME</label>
                                        <p className="mt-1 text-sm text-gray-900">{logo.mime_type}</p>
                                    </div>

                                    {logo.width && logo.height && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Dimensi</label>
                                            <p className="mt-1 text-sm text-gray-900">{logo.width} x {logo.height} pixels</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Path File</label>
                                        <p className="mt-1 text-sm text-gray-900 break-all">{logo.file_path}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">URL</label>
                                        <a 
                                            href={logo.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="mt-1 text-sm text-blue-600 hover:text-blue-800 break-all"
                                        >
                                            {logo.url}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Waktu</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Dibuat</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(logo.created_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Diperbarui</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(logo.updated_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                                <Link
                                    href={route('admin.logos.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Kembali ke Daftar
                                </Link>
                                <Link
                                    href={route('admin.logos.edit', logo.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Edit Logo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}