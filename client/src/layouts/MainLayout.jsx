import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-laposh-warm text-laposh-text">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default MainLayout;
