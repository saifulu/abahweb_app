import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    PencilIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    ServerIcon,
    CurrencyDollarIcon,
    ClockIcon,
    ShieldCheckIcon,
    CloudIcon
} from '@heroicons/react/24/outline';

export default function Show({ auth, package: hostingPackage }) {
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

    const getSupportLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'basic':
                return 'bg-gray-100 text-gray-800';
            case 'priority':
                return 'bg-yellow-100 text-yellow-800';
            case 'premium':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('admin.hosting-packages.index')}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Detail Paket Hosting
                        </h2>
                    </div>
                    <Link
                        href={route('admin.hosting-packages.edit', hostingPackage.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <PencilIcon className="h-5 w-5" />
                        <span>Edit Paket</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Detail ${hostingPackage.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Section */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                {hostingPackage.name}
                                            </h1>
                                            {hostingPackage.badge && (
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(hostingPackage.badge)}`}>
                                                    {hostingPackage.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-lg">
                                            {hostingPackage.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-600">
                                            Rp {formatPrice(hostingPackage.price)}
                                        </div>
                                        <div className="text-gray-500">
                                            / {hostingPackage.billing_cycle === 'monthly' ? 'bulan' : 'tahun'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status and Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <CheckCircleIcon className="h-5 w-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">Status</span>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                        hostingPackage.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {hostingPackage.is_active ? (
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
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <CurrencyDollarIcon className="h-5 w-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">Siklus Pembayaran</span>
                                    </div>
                                    <span className="text-gray-700 capitalize">
                                        {hostingPackage.billing_cycle === 'monthly' ? 'Bulanan' : 'Tahunan'}
                                    </span>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <ShieldCheckIcon className="h-5 w-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">Level Support</span>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getSupportLevelColor(hostingPackage.support_level)}`}>
                                        {hostingPackage.support_level?.charAt(0).toUpperCase() + hostingPackage.support_level?.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Resource Specifications */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <ServerIcon className="h-6 w-6 mr-2" />
                                    Spesifikasi Sumber Daya
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="text-sm text-blue-600 font-medium">Storage</div>
                                        <div className="text-2xl font-bold text-blue-900">{hostingPackage.storage_gb}GB</div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="text-sm text-green-600 font-medium">Bandwidth</div>
                                        <div className="text-2xl font-bold text-green-900">{hostingPackage.bandwidth_gb}GB</div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <div className="text-sm text-purple-600 font-medium">Domain</div>
                                        <div className="text-2xl font-bold text-purple-900">{hostingPackage.domains}</div>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="text-sm text-yellow-600 font-medium">Email Accounts</div>
                                        <div className="text-2xl font-bold text-yellow-900">{hostingPackage.email_accounts}</div>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="text-sm text-red-600 font-medium">Database</div>
                                        <div className="text-2xl font-bold text-red-900">{hostingPackage.databases}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Features */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <CloudIcon className="h-6 w-6 mr-2" />
                                    Fitur Tambahan
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full ${hostingPackage.ssl_certificate ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-gray-700">SSL Certificate</span>
                                        <span className={`text-sm ${hostingPackage.ssl_certificate ? 'text-green-600' : 'text-red-600'}`}>
                                            {hostingPackage.ssl_certificate ? 'Included' : 'Not Included'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full ${hostingPackage.backup_included ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-gray-700">Backup</span>
                                        <span className={`text-sm ${hostingPackage.backup_included ? 'text-green-600' : 'text-red-600'}`}>
                                            {hostingPackage.backup_included ? 'Included' : 'Not Included'}
                                        </span>
                                    </div>
                                </div>

                                {hostingPackage.features && hostingPackage.features.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Fitur Lainnya:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {hostingPackage.features.filter(feature => feature.trim() !== '').map((feature, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Timestamps */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Dibuat:</span> {new Date(hostingPackage.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <div>
                                        <span className="font-medium">Terakhir diupdate:</span> {new Date(hostingPackage.updated_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}