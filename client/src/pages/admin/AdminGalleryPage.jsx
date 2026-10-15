import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { galleryAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const categoryOptions = [
  'French Nails',
  'Chrome Nails',
  'Nude Nail Designs',
  'Bridal Nails',
  'Glitter Nails',
  'Floral Nail Art',
  'Festive Nail Designs',
  'Acrylic Extensions',
  'Makeup & Hairstyles',
];

export const AdminGalleryPage = () => {
  const { showToast } = useToast();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'French Nails',
    altText: '',
    sortOrder: 0,
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await galleryAPI.getAll({ publishedOnly: 'false' });
      if (res.data?.success) {
        setImages(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load gallery items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setEditingImage(null);
    setFormData({
      title: '',
      category: 'French Nails',
      altText: '',
      sortOrder: 0,
      isPublished: true,
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (img) => {
    setEditingImage(img);
    setFormData({
      title: img.title,
      category: img.category,
      altText: img.altText || '',
      sortOrder: img.sortOrder || 0,
      isPublished: img.isPublished,
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('altText', formData.altText);
      data.append('sortOrder', formData.sortOrder);
      data.append('isPublished', formData.isPublished);

      if (imageFile) {
        data.append('image', imageFile);
      } else if (!editingImage) {
        showToast('Please select an image file to upload', 'error');
        setSubmitting(false);
        return;
      }

      if (editingImage) {
        await galleryAPI.update(editingImage._id, data);
        showToast('Gallery image updated successfully', 'success');
      } else {
        await galleryAPI.create(data);
        showToast('Gallery image uploaded successfully', 'success');
      }

      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save gallery item';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await galleryAPI.delete(id);
      showToast('Gallery item deleted', 'success');
      fetchGallery();
    } catch (err) {
      showToast('Failed to delete image', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload portfolio photos to Cloudinary, configure alt text for SEO, and manage sorting.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
          <p className="text-xs">Loading studio gallery...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="py-20 text-center text-xs text-gray-400 border border-dashed rounded-2xl bg-white p-8">
          No images uploaded yet. Click "Upload Image" to add portfolio photos.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img
                  src={img.imageUrl}
                  alt={img.altText}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-xs">
                  {img.category}
                </span>
                {!img.isPublished && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500 text-white shadow-xs">
                    Draft
                  </span>
                )}
              </div>

              <div className="p-3">
                <h4 className="font-serif text-xs font-bold text-gray-900 truncate">{img.title}</h4>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">Alt: {img.altText}</p>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-500 font-mono">Order: {img.sortOrder}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(img)}
                      className="p-1 rounded text-gray-500 hover:bg-gray-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="p-1 rounded text-rose-500 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
              {editingImage ? 'Edit Gallery Photo' : 'Upload Portfolio Photo'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Cloudinary integration with automatic image optimization.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Classic French Tips"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  SEO Alt Text (Accessibility & Google Rankings) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. French tip acrylic nail extensions in Rajkot studio"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Display Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded text-laposh-gold focus:ring-laposh-gold"
                  />
                  <label htmlFor="isPublished" className="text-xs font-semibold text-gray-700">
                    Published on website
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Choose Image File {editingImage ? '(Optional to replace)' : '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-dashed rounded-xl text-xs text-gray-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
                >
                  {submitting ? 'Uploading...' : editingImage ? 'Save Changes' : 'Upload to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPage;
