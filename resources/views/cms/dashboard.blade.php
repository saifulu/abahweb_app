<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS Dashboard - AbahWeb</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .tab-active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .tab-inactive {
            background: #f8fafc;
            color: #64748b;
        }
        .tab-inactive:hover {
            background: #e2e8f0;
            color: #475569;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Navigation Bar -->
    <nav class="gradient-bg text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo & Brand -->
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <h1 class="text-xl font-bold">AbahWeb CMS</h1>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="{{ route('cms.dashboard') }}" class="px-3 py-2 rounded-md text-sm font-medium bg-white bg-opacity-20">
                                Dashboard
                            </a>
                            <a href="{{ route('cms.hosting-packages.index') }}" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition duration-200">
                                Paket Hosting
                            </a>
                            <a href="{{ url('/') }}" target="_blank" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition duration-200">
                                Preview Website
                            </a>
                        </div>
                    </div>
                </div>

                <!-- User Menu -->
                <div class="flex items-center space-x-4">
                    <div class="hidden md:block">
                        <span class="text-sm">Selamat datang, <span class="font-medium">{{ auth()->user()->name }}</span></span>
                    </div>
                    <form method="POST" action="{{ route('cms.logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" x-data="cmsApp()">
        <!-- Page Header -->
        <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Content Management</h2>
            <p class="mt-2 text-gray-600">Kelola konten landing page AbahWeb dengan mudah</p>
        </div>

        <!-- Success/Error Messages -->
        <div x-show="message" x-text="message" 
             :class="$data.messageType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'"
             class="border px-4 py-3 rounded-lg mb-6 flex items-center" x-transition>
            <svg x-show="$data.messageType === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <svg x-show="$data.messageType === 'error'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
        </div>

        <!-- Tabs Navigation -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="border-b border-gray-200">
                <!-- Desktop Tabs -->
                <nav class="hidden md:flex space-x-8 px-6" aria-label="Tabs">
                    @php
                        $sections = $contentsBySection->keys()->toArray();
                        $sectionIcons = [
                            'hero' => 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
                            'features' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                            'about' => 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                            'testimonials' => 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                            'cta' => 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
                            'stats' => 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                        ];
                    @endphp
                    @foreach($sections as $index => $section)
                    <button @click="activeTab = '{{ $section }}'" 
                            :class="activeTab === '{{ $section }}' ? 'tab-active border-transparent' : 'tab-inactive border-transparent hover:border-gray-300'"
                            class="py-4 px-1 border-b-2 font-medium text-sm transition duration-200 flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $sectionIcons[$section] ?? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }}"></path>
                        </svg>
                        <span class="capitalize">{{ $section }}</span>
                        <span class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">{{ count($contentsBySection[$section]) }}</span>
                    </button>
                    @endforeach
                </nav>

                <!-- Mobile Dropdown -->
                <div class="md:hidden px-4 py-3">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" 
                            class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="$data.sectionIcons[activeTab] || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'"></path>
                            </svg>
                            <span class="font-medium capitalize" x-text="activeTab"></span>
                        </div>
                        <svg class="w-5 h-5 text-gray-400 transition-transform" :class="mobileMenuOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    
                    <div x-show="mobileMenuOpen" x-transition class="mt-2 space-y-1">
                        @foreach($sections as $section)
                        <button @click="activeTab = '{{ $section }}'; mobileMenuOpen = false" 
                                :class="activeTab === '{{ $section }}' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg border border-gray-200 transition duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $sectionIcons[$section] ?? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }}"></path>
                            </svg>
                            <span class="capitalize">{{ $section }}</span>
                            <span class="ml-auto bg-gray-500 text-white text-xs px-2 py-1 rounded-full">{{ count($contentsBySection[$section]) }}</span>
                        </button>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Content -->
        @foreach($contentsBySection as $section => $contents)
        <div x-show="activeTab === '{{ $section }}'" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 transform translate-y-1" x-transition:enter-end="opacity-100 transform translate-y-0">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 capitalize flex items-center space-x-2">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $sectionIcons[$section] ?? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }}"></path>
                        </svg>
                        <span>{{ $section }} Section</span>
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">Kelola konten untuk bagian {{ $section }} pada landing page</p>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        @foreach($contents as $content)
                        <div class="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition duration-200" 
                             x-data="{ editing: false, content: @js($content) }">
                            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                                <div class="flex-1">
                                    <!-- Content Header -->
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{ $content->type }}</span>
                                            <span class="text-sm text-gray-500 font-mono break-all">{{ $content->key }}</span>
                                            <span class="text-xs text-gray-400">Order: {{ $content->order }}</span>
                                        </div>
                                        <button @click="toggleActive({{ $content->id }})" 
                                                :class="content.is_active ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'"
                                                class="text-white text-xs px-3 py-1 rounded-full transition duration-200 flex items-center space-x-1 self-start sm:self-auto">
                                            <svg x-show="content.is_active" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            <svg x-show="!content.is_active" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span x-text="content.is_active ? 'Active' : 'Inactive'"></span>
                                        </button>
                                    </div>
                                    
                                    <!-- View Mode -->
                                    <div x-show="!editing">
                                        <h4 class="font-semibold text-gray-900 mb-2" x-text="content.title"></h4>
                                        <p class="text-gray-600 text-sm leading-relaxed break-words" x-text="content.content"></p>
                                    </div>
                                    
                                    <!-- Edit Mode -->
                                    <div x-show="editing" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" x-model="content.title" 
                                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                            <textarea x-model="content.content" rows="4"
                                                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                            <input type="number" x-model="content.order" 
                                                   class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Action Buttons -->
                                <div class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-4 lg:mt-0 lg:ml-6">
                                    <div x-show="!editing" class="flex space-x-2 lg:space-x-0 lg:space-y-2 lg:flex-col">
                                        <button @click="editing = true" 
                                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center space-x-2 flex-1 lg:flex-none">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                            <span class="hidden sm:inline">Edit</span>
                                        </button>
                                    </div>
                                    <div x-show="editing" class="flex space-x-2 lg:space-x-0 lg:space-y-2 lg:flex-col w-full lg:w-auto">
                                        <button @click="saveContent({{ $content->id }})" 
                                                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center space-x-2 flex-1 lg:w-full">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span class="hidden sm:inline">Save</span>
                                        </button>
                                        <button @click="editing = false; content = @js($content)" 
                                                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center space-x-2 flex-1 lg:w-full">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            <span class="hidden sm:inline">Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                </div>
            </div>
        </div>
        @endforeach

        <!-- Quick Actions Panel -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Quick Actions</span>
            </h3>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="{{ url('/') }}" target="_blank" 
                   class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2 flex-1 sm:flex-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    <span>Preview Website</span>
                </a>
                <button @click="refreshData()" 
                        class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2 flex-1 sm:flex-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span>Refresh Data</span>
                </button>
            </div>
        </div>
    </div>

    <script>
        function cmsApp() {
            return {
                activeTab: '{{ $contentsBySection->keys()->first() ?? "hero" }}',
                message: '',
                messageType: 'success',
                mobileMenuOpen: false,
                sectionIcons: {
                    'hero': 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
                    'features': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    'about': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    'testimonials': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                    'cta': 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
                    'stats': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                    'services': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                    'contact': 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                },
                
                showMessage(text, type = 'success') {
                    this.message = text;
                    this.messageType = type;
                    setTimeout(() => {
                        this.message = '';
                    }, 3000);
                },
                
                async toggleActive(contentId) {
                    try {
                        const response = await fetch(`/cms/api/content/${contentId}/toggle`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                            }
                        });
                        
                        const data = await response.json();
                        
                        if (data.success) {
                            // Update the content status in the UI
                            const contentElement = document.querySelector(`[x-data*="content: "][x-data*='"id":${contentId}']`);
                            if (contentElement) {
                                const alpineData = Alpine.$data(contentElement);
                                alpineData.content.is_active = data.content.is_active;
                            }
                            this.showMessage('Status berhasil diubah');
                        } else {
                            this.showMessage('Gagal mengubah status', 'error');
                        }
                    } catch (error) {
                        this.showMessage('Terjadi kesalahan', 'error');
                    }
                },
                
                async saveContent(contentId) {
                    const contentElement = document.querySelector(`[x-data*="content: "][x-data*='"id":${contentId}']`);
                    const alpineData = Alpine.$data(contentElement);
                    
                    try {
                        const response = await fetch(`/cms/api/content/${contentId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                            },
                            body: JSON.stringify({
                                title: alpineData.content.title,
                                content: alpineData.content.content,
                                order: alpineData.content.order
                            })
                        });
                        
                        const data = await response.json();
                        
                        if (data.success) {
                            alpineData.editing = false;
                            this.showMessage('Konten berhasil disimpan');
                        } else {
                            this.showMessage('Gagal menyimpan konten', 'error');
                        }
                    } catch (error) {
                        this.showMessage('Terjadi kesalahan', 'error');
                    }
                },
                
                refreshData() {
                    window.location.reload();
                }
            }
        }
    </script>
</body>
</html>