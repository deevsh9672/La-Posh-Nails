import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import NailArtPage from './pages/public/NailArtPage';
import MakeupHairstylesPage from './pages/public/MakeupHairstylesPage';
import BridalBeautyPage from './pages/public/BridalBeautyPage';
import GalleryPage from './pages/public/GalleryPage';
import AcademyPage from './pages/public/AcademyPage';
import AboutPage from './pages/public/AboutPage';
import ReviewsPage from './pages/public/ReviewsPage';
import BookAppointmentPage from './pages/public/BookAppointmentPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsPage from './pages/public/TermsPage';
import CancellationPolicyPage from './pages/public/CancellationPolicyPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/nail-art" element={<NailArtPage />} />
        <Route path="/makeup-hairstyles" element={<MakeupHairstylesPage />} />
        <Route path="/bridal-beauty" element={<BridalBeautyPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/courses-academy" element={<AcademyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="appointments" element={<AdminAppointmentsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="gallery" element={<AdminGalleryPage />} />
        <Route path="course-enquiries" element={<AdminEnquiriesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
