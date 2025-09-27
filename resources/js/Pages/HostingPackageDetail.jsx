import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckIcon, 
    ArrowLeftIcon,
    ServerIcon,
    CloudIcon,
    ShieldCheckIcon,
    CpuChipIcon,
    ClockIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function HostingPackageDetail({ package: pkg }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getBadgeColor = (badge) => {
        switch (badge) {
            case 'Popular':
                return 'bg-blue-500 text-white';
            case 'Best Value':
                return 'bg-green-500 text-white';
            case 'Premium':
                return 'bg-purple-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <>
            <Head title={`${pkg.name} - Paket Hosting AbahWeb`} />
            
            {/* Background */}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Navigation */}
                <nav className="relative z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">A</span>
                                </div>
                                <span className="text-white font-bold text-xl">AbahWeb</span>
                            </Link>
                            
                            <div className="flex items-center space-x-6">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/hosting-packages" className="text-white font-medium">
                                    Hosting
                                </Link>
                                <Link href="/login" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Back Button */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <Link 
                        href="/hosting-packages" 
                        className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Kembali ke Paket Hosting</span>
                    </Link>
                </div>

                {/* Package Detail */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Package Info */}
                        <div>
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                                {/* Badge */}
                                {pkg.badge && (
                                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 ${getBadgeColor(pkg.badge)}`}>
                                        {pkg.badge}
                                    </div>
                                )}

                                {/* Package Name */}
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    Paket {pkg.name}
                                </h1>

                                {/* Package Description */}
                                <p className="text-xl text-gray-300 mb-8">
                                    {pkg.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {formatPrice(pkg.price)}
                                    </div>
                                    <div className="text-gray-400">
                                        per bulan
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Specifications */}
                        <div className="space-y-8">
                            {/* Resource Specifications */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Spesifikasi Resource</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <ServerIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{pkg.storage_gb} GB</div>
                                        <div className="text-gray-400 text-sm">SSD Storage</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <GlobeAltIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{pkg.bandwidth_gb} GB</div>
                                        <div className="text-gray-400 text-sm">Bandwidth</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <CloudIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{pkg.email_accounts}</div>
                                        <div className="text-gray-400 text-sm">Email Accounts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <CpuChipIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{pkg.databases}</div>
                                        <div className="text-gray-400 text-sm">Databases</div>
                                    </div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Fitur Lengkap</h2>
                                <div className="space-y-4">
                                    {pkg.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                    
                                    {/* Additional features based on package specs */}
                                    <div className="flex items-center space-x-3">
                                        <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">{pkg.domains} Domain{pkg.domains > 1 ? 's' : ''}</span>
                                    </div>
                                    
                                    {pkg.ssl_certificate && (
                                        <div className="flex items-center space-x-3">
                                            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">SSL Certificate Gratis</span>
                                        </div>
                                    )}
                                    
                                    {pkg.backup_daily && (
                                        <div className="flex items-center space-x-3">
                                            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">Daily Backup</span>
                                        </div>
                                    )}
                                    
                                    {pkg.support_24_7 && (
                                        <div className="flex items-center space-x-3">
                                            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">24/7 Support</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Guarantee */}
                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-8">
                                <div className="flex items-center space-x-3 mb-4">
                                    <ShieldCheckIcon className="w-8 h-8 text-green-400" />
                                    <h3 className="text-xl font-bold text-white">Garansi 30 Hari</h3>
                                </div>
                                <p className="text-gray-300">
                                    Tidak puas dengan layanan kami? Dapatkan refund 100% dalam 30 hari pertama tanpa pertanyaan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">
                            Pertanyaan Umum
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Apakah ada biaya setup?
                                </h3>
                                <p className="text-gray-300">
                                    Tidak, semua paket hosting kami bebas biaya setup. Anda hanya perlu membayar biaya hosting bulanan.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Bagaimana cara upgrade paket?
                                </h3>
                                <p className="text-gray-300">
                                    Anda dapat upgrade paket kapan saja melalui dashboard atau menghubungi tim support kami.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Apakah data saya aman?
                                </h3>
                                <p className="text-gray-300">
                                    Ya, kami menggunakan enkripsi SSL, firewall tingkat enterprise, dan backup harian untuk menjaga keamanan data Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}