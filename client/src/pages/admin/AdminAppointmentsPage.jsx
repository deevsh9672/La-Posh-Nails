import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { appointmentsAPI, servicesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminAppointmentsPage = () => {
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  // Modal State for Status Update / Notes
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editAdminNotes, setEditAdminNotes] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: 15,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
        date: dateFilter || undefined,
      };

      const res = await appointmentsAPI.getAll(params);
      if (res.data?.success) {
        setAppointments(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      showToast('Failed to load appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter, pagination.page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  const openEditModal = (app) => {
    setSelectedAppointment(app);
    setEditStatus(app.status);
    setEditAdminNotes(app.adminNotes || '');
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      setSavingStatus(true);
      const res = await appointmentsAPI.updateStatus(selectedAppointment._id, {
        status: editStatus,
        adminNotes: editAdminNotes,
      });

      if (res.data?.success) {
        showToast(`Appointment updated to ${editStatus}`, 'success');
        setSelectedAppointment(null);
        fetchAppointments();
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
    try {
      const res = await appointmentsAPI.delete(id);
      if (res.data?.success) {
        showToast('Appointment deleted', 'success');
        fetchAppointments();
      }
    } catch (err) {
      showToast('Failed to delete appointment', 'error');
    }
  };

  const handleExportCSV = () => {
    const url = appointmentsAPI.getExportUrl({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      search: search || undefined,
      date: dateFilter || undefined,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Search, verify, reschedule, and manage client bookings.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold shadow-xs"
        >
          <Download className="w-4 h-4 text-gray-500" />
          <span>Export Bookings to CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
          />
        </form>

        <div className="flex items-center gap-2">
          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white"
          />

          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="text-xs text-rose-600 hover:underline"
            >
              Clear Date
            </button>
          )}

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No-show">No-show</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
            <p className="text-xs">Loading bookings from database...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">
            No appointment bookings found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/80">
                    <td className="p-4 font-mono font-bold text-laposh-gold">
                      {app.bookingReference}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{app.customerName}</div>
                      <div className="flex items-center gap-2 text-gray-500 mt-0.5">
                        <a href={`tel:${app.phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{app.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      {app.email && <div className="text-[10px] text-gray-400">{app.email}</div>}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{app.serviceId?.name || 'Custom'}</div>
                      <div className="text-[10px] text-gray-400">{app.serviceId?.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{app.appointmentDate}</div>
                      <div className="font-mono text-gray-500">
                        {app.startTime} - {app.endTime}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-gray-700">
                        {app.bookingType === 'salon' ? 'Studio' : 'Home'}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(app)}
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium text-xs"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                        aria-label="Delete appointment"
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

        {/* Pagination Footer */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </span>
            <div className="space-x-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.pages}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status & Admin Notes Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
              Update Appointment Status
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-mono">
              Reference: {selectedAppointment.bookingReference}
            </p>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                >
                  <option value="Pending">Pending Confirmation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No-show">No-show</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Confirmed on WhatsApp, client requested almond shape extensions..."
                  value={editAdminNotes}
                  onChange={(e) => setEditAdminNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              {selectedAppointment.customerNotes && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600">
                  <span className="font-semibold block text-gray-700">Customer Note:</span>
                  {selectedAppointment.customerNotes}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStatus}
                  className="px-5 py-2 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
                >
                  {savingStatus ? 'Saving...' : 'Save Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsPage;
