import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Image as ImageIcon,
  GraduationCap,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { admin, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-laposh-warm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-laposh-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-laposh-muted">Authenticating Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/admin/appointments', icon: CalendarCheck },
    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Course Enquiries', path: '/admin/course-enquiries', icon: GraduationCap },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-serif text-lg font-bold text-laposh-text">La Posh Admin</span>
        </div>
        <button
          onClick={logout}
          className="text-xs text-rose-600 font-semibold p-2 flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Studio Brand */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/" target="_blank" className="block group">
              <span className="font-serif text-2xl font-bold text-laposh-text group-hover:text-laposh-gold transition-colors">
                La Posh
              </span>
              <span className="block text-[10px] tracking-wider uppercase font-semibold text-laposh-gold">
                Admin Management Portal
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-laposh-gold text-white shadow-subtle'
                      : 'text-gray-600 hover:bg-laposh-warm hover:text-laposh-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin User Profile & Logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-laposh-warm rounded-xl border border-laposh-border">
            <div className="w-8 h-8 rounded-full bg-laposh-gold text-white flex items-center justify-center font-bold text-xs">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-laposh-text truncate">{admin?.name}</p>
              <p className="text-[10px] text-laposh-muted truncate">{admin?.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-1 text-xs">
            <Link
              to="/"
              target="_blank"
              className="text-gray-500 hover:text-laposh-gold flex items-center gap-1 text-[11px] font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={logout}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="hidden md:flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-laposh-gold" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Studio Management Dashboard • Rajkot
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Customer Website</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Admin Pages */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
