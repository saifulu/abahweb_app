import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckIcon, 
    StarIcon,
    ServerIcon,
    CloudIcon,
    ShieldCheckIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

export default function HostingPackages({ packages }) {
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
            <Head title="Paket Hosting - AbahWeb" />
            
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

                {/* Hero Section */}
                <div className="relative z-10 pt-20 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Pilih Paket 
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Hosting </span>
                            Terbaik
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Dapatkan hosting berkualitas tinggi dengan performa optimal, keamanan terjamin, 
                            dan dukungan 24/7 untuk kesuksesan website Anda.
                        </p>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {packages.map((pkg, index) => (
                            <div 
                                key={pkg.id} 
                                className={`relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 ${
                                    pkg.badge === 'Popular' ? 'ring-2 ring-blue-500 scale-105' : 
                                    pkg.badge === 'Best Value' ? 'ring-2 ring-green-500' : ''
                                }`}
                            >
                                {/* Badge */}
                                {pkg.badge && (
                                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium ${getBadgeColor(pkg.badge)}`}>
                                        {pkg.badge}
                                    </div>
                                )}

                                {/* Package Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                                        index === 0 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                        index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                        index === 2 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                                        'bg-gradient-to-r from-pink-400 to-pink-600'
                                    }`}>
                                        {index === 0 ? <CloudIcon className="w-8 h-8 text-white" /> :
                                         index === 1 ? <ServerIcon className="w-8 h-8 text-white" /> :
                                         index === 2 ? <CpuChipIcon className="w-8 h-8 text-white" /> :
                                         <ShieldCheckIcon className="w-8 h-8 text-white" />}
                                    </div>
                                </div>

                                {/* Package Name */}
                                <h3 className="text-2xl font-bold text-white text-center mb-2">
                                    {pkg.name}
                                </h3>

                                {/* Package Description */}
                                <p className="text-gray-300 text-center mb-6 text-sm">
                                    {pkg.description}
                                </p>

                                {/* Price */}
                                <div className="text-center mb-8">
                                    <div className="text-4xl font-bold text-white mb-1">
                                        {formatPrice(pkg.price)}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        per bulan
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Storage</span>
                                        <span className="text-white font-medium">{pkg.storage_gb} GB</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Bandwidth</span>
                                        <span className="text-white font-medium">{pkg.bandwidth_gb} GB</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Email Accounts</span>
                                        <span className="text-white font-medium">{pkg.email_accounts}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Databases</span>
                                        <span className="text-white font-medium">{pkg.databases}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Domains</span>
                                        <span className="text-white font-medium">{pkg.domains}</span>
                                    </div>
                                </div>

                                {/* Additional Features */}
                                <div className="space-y-2 mb-8">
                                    {pkg.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-2">
                                            <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href={`/hosting-packages/${pkg.id}`}
                                    className={`block w-full text-center py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                        pkg.badge === 'Popular' ? 
                                        'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25' :
                                        pkg.badge === 'Best Value' ?
                                        'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25' :
                                        'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40'
                                    }`}
                                >
                                    Pilih Paket
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Comparison */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">
                            Semua Paket Termasuk
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheckIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Keamanan Tinggi</h3>
                                <p className="text-gray-300">SSL Certificate gratis, firewall, dan perlindungan DDoS</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CpuChipIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Performa Optimal</h3>
                                <p className="text-gray-300">SSD storage, CDN global, dan server berkecepatan tinggi</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <StarIcon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Support 24/7</h3>
                                <p className="text-gray-300">Tim support berpengalaman siap membantu kapan saja</p>
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