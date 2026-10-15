import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  GraduationCap,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Loader2,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { enquiriesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminEnquiriesPage = () => {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  // Update modal state
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('New');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: 15,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      };

      const res = await enquiriesAPI.getAll(params);
      if (res.data?.success) {
        setEnquiries(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      showToast('Failed to load enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, pagination.page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const openEditModal = (enq) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.followUpNotes || '');
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    try {
      setSaving(true);
      await enquiriesAPI.update(selectedEnquiry._id, {
        status: editStatus,
        followUpNotes: editNotes,
      });
      showToast('Enquiry status updated successfully', 'success');
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      showToast('Failed to update enquiry', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course enquiry lead?')) return;
    try {
      await enquiriesAPI.delete(id);
      showToast('Enquiry deleted', 'success');
      fetchEnquiries();
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const handleExportCSV = () => {
    const url = enquiriesAPI.getExportUrl({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      search: search || undefined,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Academy Course Enquiries
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage student admissions, batch interests, follow-up calls, and enrollment notes.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold shadow-xs"
        >
          <Download className="w-4 h-4 text-gray-500" />
          <span>Export Enquiries to CSV</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white font-medium"
        >
          <option value="all">All Lead Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
            <p className="text-xs">Loading course enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">
            No course enquiries found matching filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course Interest</th>
                  <th className="p-4">Skill Level</th>
                  <th className="p-4">Preferred Batch</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50/80">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{enq.studentName}</div>
                      <div className="flex items-center gap-2 text-gray-500 mt-0.5">
                        <a href={`tel:${enq.phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{enq.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      {enq.email && <div className="text-[10px] text-gray-400">{enq.email}</div>}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{enq.courseInterest}</td>
                    <td className="p-4 text-gray-600">{enq.skillLevel}</td>
                    <td className="p-4 text-gray-600">{enq.preferredBatch}</td>
                    <td className="p-4">
                      <StatusBadge status={enq.status} />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(enq)}
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium text-xs"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
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

      {/* Edit Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
              Update Student Lead
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Student: {selectedEnquiry.studentName} ({selectedEnquiry.phone})
            </p>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Lead Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Follow-up Notes & Conversation Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Student visited academy, enrolled for Nov 1 batch..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              {selectedEnquiry.message && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600">
                  <span className="font-semibold block text-gray-700">Student Message:</span>
                  {selectedEnquiry.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
                >
                  {saving ? 'Saving...' : 'Update Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;
