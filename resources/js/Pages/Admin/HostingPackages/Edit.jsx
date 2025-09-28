import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, PlusIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, package: hostingPackage }) {
    const [imagePreview, setImagePreview] = useState(hostingPackage.image ? `/images/${hostingPackage.image}` : null);
    const [uploading, setUploading] = useState(false);
    
    const { data, setData, put, processing, errors } = useForm({
        name: hostingPackage.name || '',
        description: hostingPackage.description || '',
        price: hostingPackage.price || '',
        billing_cycle: hostingPackage.billing_cycle || 'monthly',
        storage_gb: hostingPackage.storage_gb || '',
        bandwidth_gb: hostingPackage.bandwidth_gb || '',
        domains: hostingPackage.domains || '',
        email_accounts: hostingPackage.email_accounts || '',
        databases: hostingPackage.databases || '',
        ssl_certificate: hostingPackage.ssl_certificate || false,
        backup_included: hostingPackage.backup_included || false,
        support_level: hostingPackage.support_level || 'basic',
        badge: hostingPackage.badge || '',
        image: hostingPackage.image || '',
        icon: hostingPackage.icon || '',
        features: hostingPackage.features || [''],
        is_active: hostingPackage.is_active || false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.hosting-packages.update', hostingPackage.id));
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'hosting-package');
        formData.append('name', `${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`);

        try {
            const response = await fetch(route('admin.images.upload'), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            const result = await response.json();
            if (result.success) {
                setData('image', result.data.filename);
                setImagePreview(result.data.url);
            } else {
                alert('Gagal mengupload gambar: ' + result.message);
            }
        } catch (error) {
            alert('Terjadi kesalahan saat mengupload gambar');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setData('image', '');
        setImagePreview(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('admin.hosting-packages.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Paket Hosting: {hostingPackage.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${hostingPackage.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Paket *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: Starter Plan"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Badge
                                    </label>
                                    <select
                                        value={data.badge}
                                        onChange={(e) => setData('badge', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tanpa Badge</option>
                                        <option value="Popular">Popular</option>
                                        <option value="Recommended">Recommended</option>
                                        <option value="Best Value">Best Value</option>
                                    </select>
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar Paket
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-2">
                                                    <label className="cursor-pointer">
                                                        <span className="text-blue-600 hover:text-blue-500">
                                                            {uploading ? 'Mengupload...' : 'Upload gambar'}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            disabled={uploading}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG hingga 2MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon Paket
                                    </label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: server, cloud, rocket"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Nama icon Heroicons atau emoji</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi *
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Deskripsi singkat tentang paket hosting ini"
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Harga *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="50000"
                                        required
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Siklus Pembayaran *
                                    </label>
                                    <select
                                        value={data.billing_cycle}
                                        onChange={(e) => setData('billing_cycle', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="monthly">Bulanan</option>
                                        <option value="yearly">Tahunan</option>
                                    </select>
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Storage (GB) *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.storage_gb}
                                        onChange={(e) => setData('storage_gb', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="10"
                                        required
                                    />
                                    {errors.storage_gb && <p className="text-red-500 text-sm mt-1">{errors.storage_gb}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bandwidth (GB) *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.bandwidth_gb}
                                        onChange={(e) => setData('bandwidth_gb', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="100"
                                        required
                                    />
                                    {errors.bandwidth_gb && <p className="text-red-500 text-sm mt-1">{errors.bandwidth_gb}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Domain *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.domains}
                                        onChange={(e) => setData('domains', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1"
                                        required
                                    />
                                    {errors.domains && <p className="text-red-500 text-sm mt-1">{errors.domains}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Accounts *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.email_accounts}
                                        onChange={(e) => setData('email_accounts', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="10"
                                        required
                                    />
                                    {errors.email_accounts && <p className="text-red-500 text-sm mt-1">{errors.email_accounts}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Database *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.databases}
                                        onChange={(e) => setData('databases', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="5"
                                        required
                                    />
                                    {errors.databases && <p className="text-red-500 text-sm mt-1">{errors.databases}</p>}
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Level Support *
                                    </label>
                                    <select
                                        value={data.support_level}
                                        onChange={(e) => setData('support_level', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="basic">Basic</option>
                                        <option value="priority">Priority</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.ssl_certificate}
                                            onChange={(e) => setData('ssl_certificate', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                            SSL Certificate
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.backup_included}
                                            onChange={(e) => setData('backup_included', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                            Backup Included
                                        </label>
                                    </div>

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
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Fitur Tambahan
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        <span>Tambah Fitur</span>
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {data.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(index, e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Contoh: 24/7 Customer Support"
                                            />
                                            {data.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href={route('admin.hosting-packages.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Update Paket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}