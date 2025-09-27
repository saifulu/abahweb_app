import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Show({ auth, content }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeLabel = (type) => {
        const types = {
            hero: 'Hero Section',
            feature: 'Feature Section',
            testimonial: 'Testimonial',
            cta: 'Call to Action',
            about: 'About Section',
            service: 'Service Section',
            contact: 'Contact Section'
        };
        return types[type] || type;
    };

    const getTypeBadgeColor = (type) => {
        const colors = {
            hero: 'bg-purple-100 text-purple-800',
            feature: 'bg-blue-100 text-blue-800',
            testimonial: 'bg-green-100 text-green-800',
            cta: 'bg-orange-100 text-orange-800',
            about: 'bg-indigo-100 text-indigo-800',
            service: 'bg-cyan-100 text-cyan-800',
            contact: 'bg-pink-100 text-pink-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('admin.homepage-content.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail Konten: {content.title}
                        </h2>
                    </div>
                    <Link
                        href={route('admin.homepage-content.edit', content.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>Edit</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Detail ${content.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Info */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(content.type)}`}>
                                            {getTypeLabel(content.type)}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            {content.is_active ? (
                                                <>
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                    <span className="text-green-700 font-medium">Aktif</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircleIcon className="h-5 w-5 text-red-500" />
                                                    <span className="text-red-700 font-medium">Nonaktif</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {content.subtitle && (
                                    <p className="text-lg text-gray-600 mb-4">{content.subtitle}</p>
                                )}
                                
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Urutan Tampil:</span> #{content.sort_order}
                                    </div>
                                    <div>
                                        <span className="font-medium">ID:</span> {content.id}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Konten</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 whitespace-pre-wrap">{content.content}</p>
                                    </div>
                                </div>

                                {/* Button Information */}
                                {(content.button_text || content.button_url) && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Tombol</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            {content.button_text && (
                                                <div>
                                                    <span className="font-medium text-gray-700">Teks Tombol:</span>
                                                    <span className="ml-2 text-gray-600">{content.button_text}</span>
                                                </div>
                                            )}
                                            {content.button_url && (
                                                <div>
                                                    <span className="font-medium text-gray-700">URL Tombol:</span>
                                                    <a 
                                                        href={content.button_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="ml-2 text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        {content.button_url}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Image */}
                                {content.image_url && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Gambar</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="mb-2">
                                                <span className="font-medium text-gray-700">URL:</span>
                                                <a 
                                                    href={content.image_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-blue-600 hover:text-blue-800 underline break-all"
                                                >
                                                    {content.image_url}
                                                </a>
                                            </div>
                                            <div className="mt-3">
                                                <img 
                                                    src={content.image_url} 
                                                    alt={content.title}
                                                    className="max-w-md max-h-64 object-cover rounded-lg border border-gray-200"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <div className="hidden bg-gray-200 rounded-lg p-8 text-center text-gray-500">
                                                    Gambar tidak dapat dimuat
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                {content.metadata && Object.keys(content.metadata).length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {Object.entries(content.metadata).map(([key, value]) => (
                                                    <div key={key} className="flex">
                                                        <span className="font-medium text-gray-700 min-w-0 flex-shrink-0 mr-2">
                                                            {key}:
                                                        </span>
                                                        <span className="text-gray-600 break-all">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Waktu</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div>
                                            <span className="font-medium text-gray-700">Dibuat:</span>
                                            <span className="ml-2 text-gray-600">{formatDate(content.created_at)}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Diperbarui:</span>
                                            <span className="ml-2 text-gray-600">{formatDate(content.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                                <Link
                                    href={route('admin.homepage-content.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Kembali ke Daftar
                                </Link>
                                <Link
                                    href={route('admin.homepage-content.edit', content.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    <span>Edit Konten</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}