import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    ServerIcon, 
    GlobeAltIcon, 
    ShieldCheckIcon,
    UserGroupIcon,
    CheckCircleIcon,
    ChartBarIcon,
    CloudIcon,
    CpuChipIcon,
    RocketLaunchIcon,
    StarIcon,
    ArrowRightIcon,
    PlayIcon,
    ChevronDownIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function Welcome({ auth, laravelVersion, phpVersion, content = {}, hostingPackages = [], logos = {} }) {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [stats, setStats] = useState({
        users: 0,
        servers: 0,
        uptime: 0,
        countries: 0
    });

    // Get CMS content with fallbacks
    const heroContent = content.hero || {
        title: 'AbahWeb - Professional Hosting & Tunneling Platform',
        subtitle: 'Solusi hosting dan tunneling terdepan dengan teknologi enterprise-grade untuk bisnis modern',
        content: 'Platform hosting dan tunneling yang dirancang khusus untuk developer, startup, dan enterprise dengan infrastruktur cloud terdistribusi dan keamanan tingkat militer.',
        button_text: 'Mulai Sekarang',
        button_url: '/register'
    };

    const aboutContent = content.about || {
        title: 'Mengapa Memilih AbahWeb?',
        content: 'Kami menyediakan infrastruktur hosting dan tunneling yang handal dengan teknologi terdepan untuk mendukung pertumbuhan bisnis Anda.'
    };

    const ctaContent = content.cta || {
        title: 'Siap Memulai Perjalanan Digital Anda?',
        subtitle: 'Bergabunglah dengan ribuan developer dan perusahaan yang mempercayai AbahWeb',
        button_text: 'Daftar Gratis Sekarang',
        button_url: '/register'
    };

    // Use CMS testimonials or fallback to default
    const testimonials = content.testimonials && content.testimonials.length > 0 
        ? content.testimonials.map(item => ({
            name: item.metadata?.name || 'Anonymous',
            role: item.metadata?.role || 'User',
            content: item.content,
            rating: parseInt(item.metadata?.rating) || 5,
            avatar: item.metadata?.avatar || '👤'
        }))
        : [
            {
                name: 'Ahmad Rizki',
                role: 'CTO, TechStartup Indonesia',
                content: 'AbahWeb telah mengubah cara kami mengelola infrastruktur. Performa luar biasa dengan dukungan teknis yang responsif.',
                rating: 5,
                avatar: '👨‍💻'
            },
            {
                name: 'Sarah Putri',
                role: 'DevOps Engineer, FinTech Corp',
                content: 'Tunneling services yang sangat reliable. Setup mudah dan monitoring real-time membantu kami maintain uptime 99.9%.',
                rating: 5,
                avatar: '👩‍💼'
            },
            {
                name: 'Budi Santoso',
                role: 'IT Director, E-commerce Giant',
                content: 'Migrasi ke AbahWeb adalah keputusan terbaik. Scaling otomatis dan security features sangat membantu bisnis kami.',
                rating: 5,
                avatar: '👨‍💼'
            }
        ];

    // Use CMS features or fallback to default
    const features = content.features && content.features.length > 0
        ? content.features.map(item => ({
            name: item.title,
            description: item.content,
            icon: getIconComponent(item.metadata?.icon),
            gradient: item.metadata?.gradient || 'from-blue-500 to-cyan-500',
            stats: item.metadata?.stats || 'Available'
        }))
        : [
            {
                name: 'Enterprise Hosting',
                description: 'Infrastruktur hosting tingkat enterprise dengan SLA 99.9% uptime dan dukungan 24/7',
                icon: ServerIcon,
                gradient: 'from-blue-500 to-cyan-500',
                stats: '15K+ Websites'
            },
            {
                name: 'Advanced Tunneling',
                description: 'Teknologi tunneling canggih dengan protokol multiple dan enkripsi end-to-end',
                icon: GlobeAltIcon,
                gradient: 'from-purple-500 to-pink-500',
                stats: '847 Active Tunnels'
            },
            {
                name: 'Security Shield',
                description: 'Perlindungan berlapis dengan AI-powered threat detection dan real-time monitoring',
                icon: ShieldCheckIcon,
                gradient: 'from-green-500 to-emerald-500',
                stats: '99.99% Secure'
            },
            {
                name: 'Smart Analytics',
                description: 'Dashboard analytics real-time dengan machine learning insights dan predictive scaling',
                icon: ChartBarIcon,
                gradient: 'from-orange-500 to-red-500',
                stats: 'Real-time Data'
            },
            {
                name: 'Cloud Integration',
                description: 'Integrasi seamless dengan major cloud providers dan hybrid cloud architecture',
                icon: CloudIcon,
                gradient: 'from-indigo-500 to-blue-500',
                stats: '45+ Integrations'
            },
            {
                name: 'Performance Boost',
                description: 'Optimasi performa otomatis dengan CDN global dan edge computing technology',
                icon: CpuChipIcon,
                gradient: 'from-teal-500 to-cyan-500',
                stats: '300% Faster'
            }
        ];

    // Helper function to get icon component from string
    function getIconComponent(iconName) {
        const iconMap = {
            'ServerIcon': ServerIcon,
            'GlobeAltIcon': GlobeAltIcon,
            'ShieldCheckIcon': ShieldCheckIcon,
            'ChartBarIcon': ChartBarIcon,
            'CloudIcon': CloudIcon,
            'CpuChipIcon': CpuChipIcon,
            'UserGroupIcon': UserGroupIcon,
            'CheckCircleIcon': CheckCircleIcon,
            'RocketLaunchIcon': RocketLaunchIcon
        };
        return iconMap[iconName] || ServerIcon;
    }

    // Get stats from CMS or use default animated stats
    const statsData = content.stats && content.stats.length > 0
        ? content.stats.reduce((acc, item) => {
            const key = item.metadata?.key;
            const value = parseFloat(item.metadata?.value) || 0;
            if (key) acc[key] = value;
            return acc;
        }, {})
        : { users: 15420, servers: 847, uptime: 99.9, countries: 45 };

    // Animated counter effect
    useEffect(() => {
        const targetStats = { users: 15420, servers: 847, uptime: 99.9, countries: 45 };
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setStats({
                users: Math.floor(targetStats.users * progress),
                servers: Math.floor(targetStats.servers * progress),
                uptime: Math.min(targetStats.uptime * progress, 99.9),
                countries: Math.floor(targetStats.countries * progress)
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setStats(targetStats);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    // Testimonial carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown and mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container') && !event.target.closest('nav')) {
                setActiveDropdown(null);
            }
            if (!event.target.closest('nav') && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setIsMobileMenuOpen(false);
                setActiveDropdown(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <>
            <Head title="AbahWeb - Professional Hosting & Tunneling Platform" />
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(5deg); }
                    50% { transform: translateY(-20px) rotate(0deg); }
                    75% { transform: translateY(-10px) rotate(-5deg); }
                }
                
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.05); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5), 0 0 60px rgba(6, 182, 212, 0.3); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { 
                        box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 
                                   0 0 40px rgba(139, 92, 246, 0.2),
                                   0 0 60px rgba(236, 72, 153, 0.1);
                    }
                    50% { 
                        box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 
                                   0 0 60px rgba(139, 92, 246, 0.4),
                                   0 0 90px rgba(236, 72, 153, 0.2);
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: floatSlow 8s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                
                .animate-glow {
                    animation: glow 3s ease-in-out infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 4s ease-in-out infinite;
                }
                
                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
                
                .glass-effect {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .text-shimmer {
                    background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
                    background-size: 200% 100%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 3s linear infinite;
                }
            `}</style>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-pink-900/10"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-900/5 to-cyan-900/15"></div>
                
                {/* Sophisticated Lighting Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Main ambient lighting */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-radial from-cyan-400/10 via-blue-500/5 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-500/15 via-pink-500/8 to-transparent blur-3xl"></div>
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl"></div>
                    
                    {/* Enhanced Animated Background Elements */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-bl from-pink-500/25 to-purple-500/15 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-blob animation-delay-4000"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-tl from-indigo-500/20 to-cyan-500/15 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
                    
                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                    
                    {/* Dynamic light rays */}
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent animate-pulse"></div>
                    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-400/15 via-transparent to-transparent animate-pulse delay-1000"></div>
                    <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-blue-400/10 via-transparent to-transparent animate-pulse delay-2000"></div>
                </div>

                {/* Global Floating Decorative Elements */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    {/* Floating geometric shapes */}
                    <div className="absolute top-20 left-10 w-4 h-4 border-2 border-cyan-400/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
                    <div className="absolute top-40 right-20 w-6 h-6 border-2 border-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-60 left-1/4 w-3 h-3 bg-blue-400/40 transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-40 right-10 w-5 h-5 border-2 border-pink-400/30 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
                    <div className="absolute bottom-60 left-20 w-2 h-2 bg-green-400/50 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
                    <div className="absolute top-1/3 right-1/4 w-4 h-4 border border-yellow-400/30 rotate-45 animate-pulse" style={{animationDelay: '4s'}}></div>
                    
                    {/* Floating icons */}
                    <div className="absolute top-32 right-1/3 text-cyan-400/20 animate-float" style={{animationDelay: '0.5s'}}>
                        <ServerIcon className="w-8 h-8" />
                    </div>
                    <div className="absolute bottom-32 left-1/3 text-purple-400/20 animate-float" style={{animationDelay: '2.5s'}}>
                        <CloudIcon className="w-6 h-6" />
                    </div>
                    <div className="absolute top-1/2 right-12 text-blue-400/20 animate-float" style={{animationDelay: '1.5s'}}>
                        <CpuChipIcon className="w-7 h-7" />
                    </div>
                    <div className="absolute bottom-1/4 left-12 text-pink-400/20 animate-float" style={{animationDelay: '3.5s'}}>
                        <ShieldCheckIcon className="w-5 h-5" />
                    </div>
                    
                    {/* Floating dots with trails */}
                    <div className="absolute top-24 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-80 right-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
                    <div className="absolute bottom-24 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
                    <div className="absolute bottom-80 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                    
                    {/* Constellation lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" style={{zIndex: -1}}>
                        <defs>
                            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#constellation)" strokeWidth="1" className="animate-pulse" />
                        <line x1="70%" y1="30%" x2="90%" y2="50%" stroke="url(#constellation)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <line x1="20%" y1="70%" x2="40%" y2="90%" stroke="url(#constellation)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '2s'}} />
                        <line x1="60%" y1="60%" x2="80%" y2="80%" stroke="url(#constellation)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '3s'}} />
                    </svg>
                </div>

                {/* Navigation */}
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/30 shadow-2xl shadow-black/20' 
                        : 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/10'
                }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 lg:h-20">
                            <div className="flex items-center">
                                <div className="flex items-center space-x-2 hover-lift cursor-pointer group">
                                    <img 
                                        src="/images/logoabahweb.svg" 
                                        alt="AbahWeb Logo" 
                                        className="h-8 lg:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <h1 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                        AbahWeb
                                    </h1>
                                </div>
                            </div>
                            
                            {/* Desktop Menu */}
                            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                                {/* Domain Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'domain' ? null : 'domain')}
                                    >
                                        <span>Domain</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'domain' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Domain Services</h3>
                                                <p className="text-sm text-gray-600">Kelola domain Anda dengan mudah</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <GlobeAltIcon className="w-5 h-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Cari Domain</div>
                                                    <div className="text-sm text-gray-600">Temukan domain impian Anda</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Transfer Domain</div>
                                                    <div className="text-sm text-gray-600">Pindahkan domain ke kami</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Hosting Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'hosting' ? null : 'hosting')}
                                    >
                                        <span>Hosting</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'hosting' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Web Hosting</h3>
                                                <p className="text-sm text-gray-600">Hosting terbaik untuk website Anda</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ServerIcon className="w-5 h-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Shared Hosting</div>
                                                    <div className="text-sm text-gray-600">Hosting ekonomis untuk pemula</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <CloudIcon className="w-5 h-5 text-purple-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Cloud Hosting</div>
                                                    <div className="text-sm text-gray-600">Performa tinggi dan scalable</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Server Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'server' ? null : 'server')}
                                    >
                                        <span>Server</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'server' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Server Solutions</h3>
                                                <p className="text-sm text-gray-600">Solusi server untuk bisnis Anda</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <CpuChipIcon className="w-5 h-5 text-red-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">VPS</div>
                                                    <div className="text-sm text-gray-600">Virtual Private Server</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ServerIcon className="w-5 h-5 text-orange-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Dedicated Server</div>
                                                    <div className="text-sm text-gray-600">Server khusus untuk Anda</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Tunneling Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'tunneling' ? null : 'tunneling')}
                                    >
                                        <span>Tunneling</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'tunneling' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Tunneling Services</h3>
                                                <p className="text-sm text-gray-600">Akses aman dan cepat</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Secure Tunnel</div>
                                                    <div className="text-sm text-gray-600">Koneksi aman dan terenkripsi</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <RocketLaunchIcon className="w-5 h-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Fast Tunnel</div>
                                                    <div className="text-sm text-gray-600">Akses cepat tanpa batas</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Website Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'website' ? null : 'website')}
                                    >
                                        <span>Website</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'website' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Website Builder</h3>
                                                <p className="text-sm text-gray-600">Buat website dengan mudah</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ComputerDesktopIcon className="w-5 h-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Website Builder</div>
                                                    <div className="text-sm text-gray-600">Drag & drop website builder</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <GlobeAltIcon className="w-5 h-5 text-purple-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Template Premium</div>
                                                    <div className="text-sm text-gray-600">Template siap pakai</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Aplikasi Dropdown */}
                                <div className="relative group dropdown-container">
                                    <button 
                                        className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 font-medium"
                                        onClick={() => setActiveDropdown(activeDropdown === 'aplikasi' ? null : 'aplikasi')}
                                    >
                                        <span>Aplikasi</span>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                    {activeDropdown === 'aplikasi' && (
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900">Aplikasi & Tools</h3>
                                                <p className="text-sm text-gray-600">Tools untuk produktivitas</p>
                                            </div>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <DevicePhoneMobileIcon className="w-5 h-5 text-green-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Mobile App</div>
                                                    <div className="text-sm text-gray-600">Kelola hosting dari HP</div>
                                                </div>
                                            </a>
                                            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                                                <ChartBarIcon className="w-5 h-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-gray-900">Analytics</div>
                                                    <div className="text-sm text-gray-600">Monitor performa website</div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* About Link */}
                                <a href="#about" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            </div>
                            
                            {/* Desktop Auth Buttons */}
                            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm xl:text-base"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-white/80 hover:text-white px-3 xl:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm xl:text-base"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm xl:text-base"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                            
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-white/80 hover:text-white p-2 rounded-lg transition-colors duration-200"
                                >
                                    {isMobileMenuOpen ? (
                                        <XMarkIcon className="w-6 h-6" />
                                    ) : (
                                        <Bars3Icon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-white/20">
                            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
                                {/* Mobile Menu Items */}
                                <div className="space-y-2">
                                    {/* Domain */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'domain-mobile' ? null : 'domain-mobile')}
                                        >
                                            <span>Domain</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'domain-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'domain-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <GlobeAltIcon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Cari Domain</div>
                                                        <div className="text-sm text-white/50">Temukan domain impian Anda</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ShieldCheckIcon className="w-5 h-5 text-green-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Transfer Domain</div>
                                                        <div className="text-sm text-white/50">Pindahkan domain ke kami</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hosting */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'hosting-mobile' ? null : 'hosting-mobile')}
                                        >
                                            <span>Hosting</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'hosting-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'hosting-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ServerIcon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Shared Hosting</div>
                                                        <div className="text-sm text-white/50">Hosting ekonomis untuk pemula</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <CloudIcon className="w-5 h-5 text-purple-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Cloud Hosting</div>
                                                        <div className="text-sm text-white/50">Performa tinggi dan scalable</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Server */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'server-mobile' ? null : 'server-mobile')}
                                        >
                                            <span>Server</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'server-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'server-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <CpuChipIcon className="w-5 h-5 text-red-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">VPS</div>
                                                        <div className="text-sm text-white/50">Virtual Private Server</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ServerIcon className="w-5 h-5 text-orange-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Dedicated Server</div>
                                                        <div className="text-sm text-white/50">Server khusus untuk Anda</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tunneling */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'tunneling-mobile' ? null : 'tunneling-mobile')}
                                        >
                                            <span>Tunneling</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'tunneling-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'tunneling-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ShieldCheckIcon className="w-5 h-5 text-green-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Secure Tunnel</div>
                                                        <div className="text-sm text-white/50">Koneksi aman dan terenkripsi</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <RocketLaunchIcon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Fast Tunnel</div>
                                                        <div className="text-sm text-white/50">Akses cepat tanpa batas</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Website */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'website-mobile' ? null : 'website-mobile')}
                                        >
                                            <span>Website</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'website-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'website-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ComputerDesktopIcon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Website Builder</div>
                                                        <div className="text-sm text-white/50">Drag & drop website builder</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <GlobeAltIcon className="w-5 h-5 text-purple-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Template Premium</div>
                                                        <div className="text-sm text-white/50">Template siap pakai</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Aplikasi */}
                                    <div>
                                        <button 
                                            className="flex items-center justify-between w-full text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                                            onClick={() => setActiveDropdown(activeDropdown === 'aplikasi-mobile' ? null : 'aplikasi-mobile')}
                                        >
                                            <span>Aplikasi</span>
                                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'aplikasi-mobile' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'aplikasi-mobile' && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <DevicePhoneMobileIcon className="w-5 h-5 text-green-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Mobile App</div>
                                                        <div className="text-sm text-white/50">Kelola hosting dari HP</div>
                                                    </div>
                                                </a>
                                                <a href="#" className="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                    <ChartBarIcon className="w-5 h-5 text-blue-400 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Analytics</div>
                                                        <div className="text-sm text-white/50">Monitor performa website</div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* About */}
                                    <a href="#about" className="block text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium">
                                        About
                                    </a>
                                </div>

                                {/* Mobile Auth Buttons */}
                                <div className="pt-4 border-t border-white/20 space-y-3">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-center"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="block w-full text-white/80 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center border border-white/20 hover:border-white/40"
                                            >
                                                Masuk
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-center"
                                            >
                                                Daftar Gratis
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                        }}></div>
                    </div>

                    {/* Floating background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 animate-fade-in">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Trusted by 10,000+ developers worldwide
                                </div>

                                {/* Main heading */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                                    Dari Website <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Pribadi</span> hingga{' '}
                                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Perusahaan</span>
                                </h1>

                                {/* Subtitle */}
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-slide-up delay-200">
                                    Hosting berkualitas tinggi dengan performa maksimal, keamanan terdepan, dan dukungan 24/7. 
                                    Mulai dari Rp 15.000/bulan.
                                </p>

                                {/* CTA Section */}
                                <div className="mb-12 animate-slide-up delay-300">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6">
                                        <Link
                                            href="/register"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                                        >
                                            Mulai Gratis Sekarang
                                        </Link>
                                        
                                        <Link
                                            href="/hosting-packages"
                                            className="text-white px-8 py-4 rounded-lg font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5"
                                        >
                                            Lihat Paket Hosting
                                        </Link>
                                    </div>
                                    
                                    <p className="text-sm text-gray-400">
                                        ✓ Domain gratis ✓ SSL gratis ✓ Migrasi gratis ✓ Garansi uptime 99.9%
                                    </p>
                                </div>

                                {/* Trust indicators */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up delay-500">
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">99.9%</div>
                                        <div className="text-gray-400 text-sm">Uptime Guarantee</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
                                        <div className="text-gray-400 text-sm">Expert Support</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
                                        <div className="text-gray-400 text-sm">Happy Customers</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">Free</div>
                                        <div className="text-gray-400 text-sm">SSL & Domain</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Hero Image */}
                            <div className="relative flex justify-center lg:justify-end">
                                {/* Decorative elements */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                </div>
                                
                                {/* Floating elements around the image */}
                                <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl animate-float shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                                    <ServerIcon className="w-8 h-8 text-white" />
                                </div>
                                
                                <div className="absolute top-20 right-10 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl animate-float delay-1000 shadow-lg shadow-purple-500/50 flex items-center justify-center">
                                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                                </div>
                                
                                <div className="absolute bottom-20 left-5 w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl animate-float delay-500 shadow-lg shadow-green-500/50 flex items-center justify-center">
                                    <RocketLaunchIcon className="w-7 h-7 text-white" />
                                </div>
                                
                                <div className="absolute bottom-10 right-5 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg animate-float delay-1500 shadow-lg shadow-orange-500/50 flex items-center justify-center">
                                    <GlobeAltIcon className="w-5 h-5 text-white" />
                                </div>

                                {/* Main SVG Image */}
                                <div className="relative z-10 max-w-lg w-full animate-fade-in-scale">
                                    <img 
                                        src="/images/abahweb_depan_svg.svg" 
                                        alt="AbahWeb Hosting Illustration" 
                                        className="w-full h-auto animate-gentle-bounce"
                                        style={{
                                            filter: 'drop-shadow(0 25px 50px rgba(59, 130, 246, 0.3))'
                                        }}
                                    />
                                </div>

                                {/* Glowing orbs */}
                                <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-700"></div>
                                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hosting Packages Section */}
                <div className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Paket Hosting Terbaik untuk Setiap Kebutuhan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Pilih paket hosting yang sesuai dengan kebutuhan website Anda. 
                                Semua paket dilengkapi dengan fitur premium dan dukungan 24/7.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {hostingPackages.map((pkg, index) => {
                                // Determine if this package should be highlighted
                                const isPopular = pkg.badge === 'Popular' || pkg.badge === 'Most Popular';
                                const isPremium = pkg.badge === 'Premium';
                                
                                // Dynamic styling based on package type
                                const cardClasses = isPopular 
                                    ? "relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-500 p-8 hover:shadow-xl transition-all duration-300 transform scale-105"
                                    : isPremium
                                    ? "relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-500 p-8 hover:shadow-xl transition-all duration-300"
                                    : "relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300";
                                
                                const buttonClasses = isPopular
                                    ? "w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 inline-block text-center"
                                    : isPremium
                                    ? "w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 inline-block text-center"
                                    : "w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 inline-block text-center";

                                return (
                                    <div key={pkg.id} className={cardClasses}>
                                        {/* Badge for popular/premium packages */}
                                        {pkg.badge && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                                    isPopular 
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                                        : isPremium
                                                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                                        : 'bg-gray-900 text-white'
                                                }`}>
                                                    {pkg.badge}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Package Image */}
                                        {pkg.image && (
                                            <div className="text-center mb-6">
                                                <img 
                                                    src={`/images/${pkg.image}`} 
                                                    alt={pkg.name}
                                                    className="w-16 h-16 mx-auto object-contain"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                            <p className="text-gray-600 mb-6">{pkg.description}</p>
                                            <div className="mb-6">
                                                <span className="text-4xl font-bold text-gray-900">
                                                    Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                                </span>
                                                <span className="text-gray-600">/{pkg.billing_cycle}</span>
                                            </div>
                                            <Link
                                                href="/register"
                                                className={buttonClasses}
                                            >
                                                Pilih Paket
                                            </Link>
                                        </div>
                                        
                                        {/* Features */}
                                        <div className="mt-8 space-y-4">
                                            {/* Storage */}
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {pkg.storage_gb === -1 ? 'Unlimited' : `${pkg.storage_gb} GB`} SSD Storage
                                                </span>
                                            </div>
                                            
                                            {/* Domains */}
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {pkg.domains === -1 ? 'Unlimited' : pkg.domains} Website{pkg.domains !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            
                                            {/* Email Accounts */}
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">
                                                    {pkg.email_accounts === -1 ? 'Unlimited' : pkg.email_accounts} Email Account{pkg.email_accounts !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            
                                            {/* SSL Certificate */}
                                            {pkg.ssl_certificate && (
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">Free SSL Certificate</span>
                                                </div>
                                            )}
                                            
                                            {/* Support */}
                                            {pkg.support_24_7 && (
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">24/7 Support</span>
                                                </div>
                                            )}
                                            
                                            {/* Additional Features from JSON */}
                                            {pkg.features && pkg.features.slice(0, 2).map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Additional features */}
                        <div className="mt-16 text-center">
                            <p className="text-gray-600 mb-8">Semua paket hosting dilengkapi dengan:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">SSL Gratis</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">SSD Speed</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v6m0 6v6m6-12h-6m-6 0h6" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16 lg:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Mengapa Memilih AbahWeb?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Kami menyediakan solusi hosting terlengkap dengan teknologi terdepan 
                                dan dukungan terbaik untuk kesuksesan website Anda.
                            </p>
                        </div>

                        {/* Main Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Performa Lightning Fast</h3>
                                <p className="text-gray-600 mb-6">
                                    Server SSD NVMe dengan teknologi LiteSpeed dan CDN global untuk kecepatan loading website hingga 3x lebih cepat.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        SSD NVMe Storage
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        LiteSpeed Web Server
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Global CDN
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Keamanan Maksimal</h3>
                                <p className="text-gray-600 mb-6">
                                    Perlindungan berlapis dengan firewall canggih, SSL gratis, dan backup otomatis harian untuk menjaga data Anda.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        SSL Certificate Gratis
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Advanced Firewall
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Daily Backup
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v6m0 6v6m6-12h-6m-6 0h6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Support Expert 24/7</h3>
                                <p className="text-gray-600 mb-6">
                                    Tim support berpengalaman siap membantu Anda kapan saja melalui live chat, email, atau telepon dalam bahasa Indonesia.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Live Chat 24/7
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Bahasa Indonesia
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Technical Expert
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                            <div className="text-center mb-12">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                    Fitur Lengkap untuk Semua Kebutuhan
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Dapatkan semua tools dan fitur yang Anda butuhkan untuk mengelola website dengan mudah
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">cPanel</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">MySQL</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Email</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Analytics</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Backup</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">CDN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Dipercaya oleh 10,000+ Developer
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Bergabunglah dengan ribuan developer dan perusahaan yang telah mempercayai AbahWeb untuk hosting mereka
                            </p>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                                <div className="text-gray-600">Uptime Guarantee</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                                <div className="text-gray-600">Expert Support</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
                                <div className="text-gray-600">Average Rating</div>
                            </div>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6">
                                    "AbahWeb memberikan performa hosting yang luar biasa. Website saya loading 3x lebih cepat setelah pindah ke sini. Support team juga sangat responsif!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        AR
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Ahmad Rizki</div>
                                        <div className="text-gray-600 text-sm">Full Stack Developer</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6">
                                    "Sudah 2 tahun menggunakan AbahWeb dan tidak pernah kecewa. Uptime selalu stabil 99.9% dan fitur backup otomatis sangat membantu."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        SP
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Sari Putri</div>
                                        <div className="text-gray-600 text-sm">E-commerce Owner</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-6">
                                    "Tim support AbahWeb luar biasa! Mereka membantu migrasi website saya dengan sangat profesional dan cepat. Highly recommended!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        BH
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Budi Hartono</div>
                                        <div className="text-gray-600 text-sm">Digital Agency</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center mt-16">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    Siap Bergabung dengan Ribuan Developer Lainnya?
                                </h3>
                                <p className="text-xl mb-8 opacity-90">
                                    Mulai hosting website Anda hari ini dengan paket yang sesuai kebutuhan
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                                        Mulai Gratis
                                    </button>
                                    <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
                                        Lihat Paket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                        <RocketLaunchIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        AbahWeb
                                    </h3>
                                </div>
                                <p className="text-white/70 mb-6 max-w-md">
                                    Platform hosting dan tunneling terdepan dengan teknologi AI dan keamanan enterprise untuk masa depan digital yang lebih baik.
                                </p>
                                <div className="text-sm text-white/50">
                                    Laravel v{laravelVersion} | PHP v{phpVersion}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Platform</h4>
                                <ul className="space-y-2 text-white/70">
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Hosting</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Tunneling</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Analytics</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Dukungan</h4>
                                <ul className="space-y-2 text-white/70">
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Dokumentasi</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Status Page</a></li>
                                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Kontak</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-white/10 mt-12 pt-8 text-center">
                            <p className="text-white/50">
                                &copy; 2024 AbahWeb. All rights reserved. Built with ❤️ for developers.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}