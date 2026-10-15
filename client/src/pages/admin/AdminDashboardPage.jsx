import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Loader2,
  Calendar,
  Phone,
  User,
} from 'lucide-react';
import { appointmentsAPI } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await appointmentsAPI.getMetrics();
        if (res.data?.success) {
          setMetrics(res.data.data);
        }
      } catch (err) {
        console.warn('Metrics load error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
        <p className="text-xs">Loading studio statistics...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Appointments',
      value: metrics?.totalAppointments ?? 0,
      icon: CalendarCheck,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Pending Confirmation',
      value: metrics?.pendingCount ?? 0,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Confirmed Slots',
      value: metrics?.confirmedCount ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Completed Services',
      value: metrics?.completedCount ?? 0,
      icon: Sparkles,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      title: 'Cancelled / No-shows',
      value: metrics?.cancelledCount ?? 0,
      icon: XCircle,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      title: 'Academy Enquiries',
      value: metrics?.totalEnquiries ?? 0,
      icon: GraduationCap,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Studio Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time overview of salon bookings, studio capacity, and academy leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/appointments"
            className="px-4 py-2 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold shadow-xs"
          >
            Manage Appointments
          </Link>
          <Link
            to="/admin/course-enquiries"
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-white text-gray-700 text-xs font-semibold shadow-xs"
          >
            View Student Leads
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium text-gray-500">{stat.title}</span>
                <div className={`p-2 rounded-xl border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="font-serif text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-gray-900">Today’s Schedule</h2>
            <p className="text-xs text-gray-500">
              {metrics?.todayCount ?? 0} appointment(s) scheduled for today.
            </p>
          </div>
          <Link
            to="/admin/appointments"
            className="text-xs font-semibold text-laposh-gold hover:underline flex items-center gap-1"
          >
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {(!metrics?.todayAppointments || metrics.todayAppointments.length === 0) ? (
          <div className="p-12 text-center text-xs text-gray-400">
            No appointments scheduled for today yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Time</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.todayAppointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/80">
                    <td className="p-4 font-mono font-medium text-gray-900">
                      {app.startTime} - {app.endTime}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{app.customerName}</div>
                      <div className="text-gray-500">{app.phone}</div>
                    </td>
                    <td className="p-4 text-gray-700">{app.serviceId?.name || 'Service'}</td>
                    <td className="p-4 font-mono text-[11px] text-gray-500">
                      {app.bookingReference}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to="/admin/appointments"
                        className="text-xs font-medium text-laposh-gold hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
