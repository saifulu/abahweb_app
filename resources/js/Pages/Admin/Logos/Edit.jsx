import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, logo }) {
    const { data, setData, post, processing, errors } = useForm({
        name: logo.name || '',
        type: logo.type || 'main',
        description: logo.description || '',
        is_active: logo.is_active || false,
        logo_file: null,
        _method: 'PUT'
    });

    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.logos.update', logo.id));
    };

    const handleFileChange = (file) => {
        if (file) {
            setData('logo_file', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const typeOptions = [
        { value: 'main', label: 'Logo Utama' },
        { value: 'secondary', label: 'Logo Sekunder' },
        { value: 'favicon', label: 'Favicon' },
        { value: 'footer', label: 'Footer' },
        { value: 'header', label: 'Header' },
        { value: 'dark', label: 'Mode Gelap' },
        { value: 'light', label: 'Mode Terang' }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('admin.logos.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Logo: {logo.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit Logo: ${logo.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Current Logo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logo Saat Ini
                                </label>
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <img
                                        src={logo.url}
                                        alt={logo.name}
                                        className="max-h-24 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <p className="text-sm text-gray-600 mt-2">
                                        {logo.file_name} ({logo.formatted_size})
                                        {logo.width && logo.height && (
                                            <span> - {logo.width}x{logo.height}px</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Logo Baru (Opsional)
                                </label>
                                <div
                                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                                        dragActive 
                                            ? 'border-blue-400 bg-blue-50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="text-center">
                                        {preview ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="mx-auto max-h-32 object-contain"
                                                />
                                                <p className="text-sm text-gray-600">
                                                    {data.logo_file?.name}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPreview(null);
                                                        setData('logo_file', null);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Hapus File
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <label htmlFor="logo_file" className="cursor-pointer">
                                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                                            Drag & drop file logo atau{' '}
                                                            <span className="text-blue-600 hover:text-blue-500">browse</span>
                                                        </span>
                                                        <input
                                                            id="logo_file"
                                                            name="logo_file"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".png,.jpg,.jpeg,.svg,.ico"
                                                            onChange={(e) => handleFileChange(e.target.files[0])}
                                                        />
                                                    </label>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        PNG, JPG, JPEG, SVG, ICO hingga 2MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {errors.logo_file && <p className="text-red-500 text-sm mt-1">{errors.logo_file}</p>}
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Logo *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: Logo Utama AbahWeb"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipe Logo *
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {typeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Deskripsi atau catatan tentang logo ini"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Status */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Aktif
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href={route('admin.logos.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Update Logo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}