import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  Sparkles,
  Loader2,
  Check,
  X,
  Upload,
} from 'lucide-react';
import { servicesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const categoryOptions = [
  'Acrylic Nail Extensions',
  'Nail Extensions',
  'Custom Nail Art',
  'Nail Repair',
  'Manicure',
  'Pedicure',
  'Nail Polish Changes',
  'Polish Removal',
  'Natural Makeup',
  'Party Makeup',
  'Bridal Makeup',
  'Professional Hairstyles',
];

export const AdminServicesPage = () => {
  const { showToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Acrylic Nail Extensions',
    description: '',
    price: '',
    durationMinutes: 60,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesAPI.getAll({ activeOnly: 'false' });
      if (res.data?.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'Acrylic Nail Extensions',
      description: '',
      price: '',
      durationMinutes: 60,
      isActive: true,
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const openEditModal = (srv) => {
    setEditingService(srv);
    setFormData({
      name: srv.name,
      category: srv.category,
      description: srv.description,
      price: srv.price !== null && srv.price !== undefined ? String(srv.price) : '',
      durationMinutes: srv.durationMinutes || 60,
      isActive: srv.isActive,
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (formData.price !== '') data.append('price', formData.price);
      data.append('durationMinutes', formData.durationMinutes);
      data.append('isActive', formData.isActive);

      if (imageFile) {
        data.append('image', imageFile);
      }

      if (editingService) {
        await servicesAPI.update(editingService._id, data);
        showToast('Service updated successfully', 'success');
      } else {
        await servicesAPI.create(data);
        showToast('Service created successfully', 'success');
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save service';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesAPI.delete(id);
      showToast('Service deleted', 'success');
      fetchServices();
    } catch (err) {
      showToast('Failed to delete service', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure studio services, descriptions, duration, verified pricing, and images.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
            <p className="text-xs">Loading services...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Service</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Verified Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((srv) => (
                  <tr key={srv._id} className="hover:bg-gray-50/80">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={srv.imageUrl}
                          alt={srv.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{srv.name}</div>
                          <div className="text-[11px] text-gray-400 font-mono">/{srv.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{srv.category}</td>
                    <td className="p-4 font-mono text-gray-700">{srv.durationMinutes || 60}m</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {srv.price !== null && srv.price !== undefined ? `₹${srv.price}` : 'Consultation'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          srv.isActive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {srv.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(srv)}
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv._id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-fade-in max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Enter service information, duration, and optional verified price.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acrylic Sculpted Extensions"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="block font-semibold text-gray-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe treatment procedures, benefits, and finishes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="360"
                    step="15"
                    required
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Verified Starting Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Leave empty if unverified"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Upload Service Image (Cloudinary / Fallback)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-dashed rounded-xl text-xs text-gray-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded text-laposh-gold focus:ring-laposh-gold"
                />
                <label htmlFor="isActive" className="text-xs font-semibold text-gray-700">
                  Service is active and bookable online
                </label>
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
                  {submitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
