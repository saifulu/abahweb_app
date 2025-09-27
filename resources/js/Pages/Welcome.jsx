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
    PlayIcon
} from '@heroicons/react/24/outline';

export default function Welcome({ auth, laravelVersion, phpVersion, content = {}, hostingPackages = [], logos = {} }) {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
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
                        <div className="flex justify-between h-20">
                            <div className="flex items-center">
                                <div className="flex items-center space-x-3 hover-lift cursor-pointer group">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                                        <RocketLaunchIcon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-shimmer group-hover:scale-105 transition-transform duration-300">
                                        AbahWeb
                                    </h1>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#features" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    Features
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <Link href={route('hosting-packages.index')} className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    Hosting Packages
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <a href="#stats" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    Analytics
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <a href="#testimonials" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    Reviews
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                                <a href="#pricing" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                                    Pricing
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-white/80 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative z-10 pt-32 pb-32 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating Orbs */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
                        
                        {/* Animated Grid Lines */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
                            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-500"></div>
                            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-1000"></div>
                        </div>
                        
                        {/* Particle Effects */}
                        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-700"></div>
                        <div className="absolute bottom-10 right-10 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-1000"></div>
                        <div className="absolute top-1/2 left-5 w-1 h-1 bg-green-400 rounded-full animate-bounce delay-1500"></div>
                        <div className="absolute top-1/3 right-5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce delay-2000"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left relative">
                                {/* Badge with enhanced styling */}
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full border border-cyan-400/40 mb-8 backdrop-blur-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300">
                                    <StarIcon className="w-5 h-5 text-cyan-300 mr-3 animate-pulse" />
                                    <span className="text-cyan-200 text-sm font-semibold tracking-wide">Trusted by 15,000+ Developers</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
                                </div>
                                
                                {/* Enhanced heading with multiple gradients and effects */}
                                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight relative">
                                    <span className="block text-white drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">Next-Gen</span>
                                    <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                                        Hosting
                                    </span>
                                    <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">Platform</span>
                                    
                                    {/* Text glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
                                </h1>
                                
                                {/* Enhanced description with better styling */}
                                <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed font-light">
                                    <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                                        Revolusioner dalam teknologi hosting dan tunneling dengan 
                                    </span>
                                    <span className="text-cyan-300 font-medium"> AI-powered infrastructure</span>, 
                                    <span className="text-blue-300 font-medium"> real-time analytics</span>, dan 
                                    <span className="text-purple-300 font-medium"> security tingkat enterprise </span>
                                    <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                                        untuk masa depan digital Anda.
                                    </span>
                                </p>
                                
                                {/* Enhanced buttons with better effects */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('register')}
                                        className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:shadow-2xl flex items-center justify-center overflow-hidden animate-pulse-glow"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">{auth.user ? 'Ke Dashboard' : 'Mulai Gratis'}</span>
                                        <ArrowRightIcon className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                                        
                                        {/* Button particles */}
                                        <div className="absolute top-0 left-0 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDelay: '0.1s'}}></div>
                                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-300/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDelay: '0.3s'}}></div>
                                    </Link>
                                    <button className="group relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 hover:border-cyan-400/50 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden glass-effect">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                                        <PlayIcon className="relative z-10 w-5 h-5 mr-2 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" />
                                        <span className="relative z-10 group-hover:text-cyan-100 transition-colors duration-300">Watch Demo</span>
                                        
                                        {/* Button glow */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-cyan-400/20 group-hover:via-blue-400/20 group-hover:to-purple-400/20 transition-all duration-500 blur-sm"></div>
                                    </button>
                                </div>
                                
                                {/* Interactive floating elements around text */}
                                <div className="absolute -top-10 -left-10 w-20 h-20 border border-cyan-400/20 rounded-full animate-spin opacity-30" style={{animationDuration: '20s'}}></div>
                                <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-purple-400/20 rounded-full animate-spin opacity-30" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                                <div className="absolute top-1/2 -left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                <div className="absolute top-1/4 -right-16 w-3 h-3 bg-cyan-400/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                            </div>

                            {/* Right Content - SVG Illustration */}
                            <div className="relative flex items-center justify-center h-full min-h-[600px]">
                                {/* Glow Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl animate-pulse"></div>
                                
                                {/* AbahWeb SVG Illustration */}
                                <div className="relative group h-full w-full flex items-center justify-center">
                                    {/* SVG Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                                    
                                    <img 
                                        src="/images/abahweb_depan_svg.svg" 
                                        alt="AbahWeb Hosting & Tunneling Platform" 
                                        className="relative z-10 w-full h-full max-w-none max-h-[580px] object-contain group-hover:scale-105 transition-all duration-700"
                                        style={{
                                            filter: 'drop-shadow(0 25px 50px rgba(6, 182, 212, 0.4)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 60px rgba(147, 51, 234, 0.2))'
                                        }}
                                    />
                                    
                                    {/* Rotating Ring */}
                                    <div className="absolute inset-0 border-2 border-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                                </div>
                                
                                {/* Enhanced Floating Elements */}
                                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce shadow-lg shadow-pink-500/50">
                                    <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse"></div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full animate-bounce delay-1000 shadow-lg shadow-green-500/50">
                                    <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse delay-500"></div>
                                </div>
                                <div className="absolute top-1/4 -right-8 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce delay-500 shadow-lg shadow-yellow-500/50"></div>
                                <div className="absolute bottom-1/4 -left-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-bounce delay-1500 shadow-lg shadow-purple-500/50"></div>
                                
                                {/* Orbiting Elements */}
                                <div className="absolute inset-0 animate-spin" style={{animationDuration: '30s'}}>
                                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 transform -translate-x-1/2"></div>
                                </div>
                                <div className="absolute inset-0 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}>
                                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 transform -translate-x-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div id="stats" className="relative z-10 py-20 bg-white/5 backdrop-blur-sm border-y border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                    {stats.users.toLocaleString()}+
                                </div>
                                <div className="text-white/60 font-medium">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                                    {stats.servers}+
                                </div>
                                <div className="text-white/60 font-medium">Servers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                                    {stats.uptime}%
                                </div>
                                <div className="text-white/60 font-medium">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                                    {stats.countries}+
                                </div>
                                <div className="text-white/60 font-medium">Countries</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="relative z-10 py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                Fitur <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revolusioner</span>
                            </h2>
                            <p className="text-xl text-white/70 max-w-3xl mx-auto">
                                Teknologi terdepan yang dirancang untuk mengoptimalkan performa, keamanan, dan skalabilitas infrastruktur digital Anda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={feature.name} className="group relative">
                                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-4">{feature.name}</h3>
                                        <p className="text-white/70 mb-4 leading-relaxed">{feature.description}</p>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-cyan-400">{feature.stats}</span>
                                            <ArrowRightIcon className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div id="testimonials" className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Dipercaya oleh <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Profesional</span>
                            </h2>
                            <p className="text-white/70 text-lg">Testimoni dari para ahli teknologi yang telah merasakan keunggulan platform kami</p>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-12">
                                <div className="text-center">
                                    <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
                                    <div className="flex justify-center mb-6">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <blockquote className="text-xl text-white/90 mb-8 italic leading-relaxed">
                                        "{testimonials[currentTestimonial].content}"
                                    </blockquote>
                                    <div>
                                        <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                                        <div className="text-cyan-400 font-medium">{testimonials[currentTestimonial].role}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Indicators */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonial 
                                                ? 'bg-cyan-400 scale-125' 
                                                : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative z-10 py-32">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Siap Memulai <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revolusi Digital</span>?
                        </h2>
                        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan developer dan perusahaan yang telah mempercayai AbahWeb untuk infrastruktur digital mereka
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center justify-center"
                                >
                                    Mulai Gratis Sekarang
                                    <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20">
                                    Konsultasi Gratis
                                </button>
                            </div>
                        )}
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