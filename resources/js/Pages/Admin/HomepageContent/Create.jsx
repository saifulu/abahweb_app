import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        content: '',
        type: 'hero',
        sort_order: 1,
        button_text: '',
        button_url: '',
        image_url: '',
        metadata: {},
        is_active: true
    });

    const [metadataFields, setMetadataFields] = useState([{ key: '', value: '' }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert metadata fields to object
        const metadataObj = {};
        metadataFields.forEach(field => {
            if (field.key.trim() && field.value.trim()) {
                metadataObj[field.key.trim()] = field.value.trim();
            }
        });
        
        setData('metadata', metadataObj);
        post(route('admin.homepage-content.store'));
    };

    const addMetadataField = () => {
        setMetadataFields([...metadataFields, { key: '', value: '' }]);
    };

    const removeMetadataField = (index) => {
        const newFields = metadataFields.filter((_, i) => i !== index);
        setMetadataFields(newFields);
    };

    const updateMetadataField = (index, field, value) => {
        const newFields = [...metadataFields];
        newFields[index][field] = value;
        setMetadataFields(newFields);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('admin.homepage-content.index')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Konten Homepage Baru
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Konten Homepage" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: Selamat Datang di AbahWeb"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipe Konten *
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="hero">Hero Section</option>
                                        <option value="feature">Feature Section</option>
                                        <option value="testimonial">Testimonial</option>
                                        <option value="cta">Call to Action</option>
                                        <option value="about">About Section</option>
                                        <option value="service">Service Section</option>
                                        <option value="contact">Contact Section</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Subtitle atau deskripsi singkat"
                                />
                                {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konten *
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Konten lengkap untuk bagian ini"
                                    required
                                />
                                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                            </div>

                            {/* Button and Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Teks Tombol
                                    </label>
                                    <input
                                        type="text"
                                        value={data.button_text}
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: Mulai Sekarang"
                                    />
                                    {errors.button_text && <p className="text-red-500 text-sm mt-1">{errors.button_text}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL Tombol
                                    </label>
                                    <input
                                        type="url"
                                        value={data.button_url}
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com"
                                    />
                                    {errors.button_url && <p className="text-red-500 text-sm mt-1">{errors.button_url}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL Gambar
                                </label>
                                <input
                                    type="url"
                                    value={data.image_url}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                            </div>

                            {/* Sort Order and Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Urutan Tampil *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1"
                                        min="1"
                                        required
                                    />
                                    {errors.sort_order && <p className="text-red-500 text-sm mt-1">{errors.sort_order}</p>}
                                </div>

                                <div className="flex items-center pt-8">
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

                            {/* Metadata */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Metadata Tambahan
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addMetadataField}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        <span>Tambah Field</span>
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {metadataFields.map((field, index) => (
                                        <div key={index} className="grid grid-cols-5 gap-2 items-center">
                                            <input
                                                type="text"
                                                value={field.key}
                                                onChange={(e) => updateMetadataField(index, 'key', e.target.value)}
                                                className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Key (contoh: icon)"
                                            />
                                            <input
                                                type="text"
                                                value={field.value}
                                                onChange={(e) => updateMetadataField(index, 'value', e.target.value)}
                                                className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Value (contoh: fas fa-star)"
                                            />
                                            {metadataFields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeMetadataField(index)}
                                                    className="text-red-600 hover:text-red-800 justify-self-center"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Metadata dapat digunakan untuk menyimpan informasi tambahan seperti icon, warna, atau data khusus lainnya.
                                </p>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href={route('admin.homepage-content.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Konten'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}