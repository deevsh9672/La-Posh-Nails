import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp = ({
  phoneNumber = '919512348787',
  customMessage = 'Hello La Posh, I would like to enquire about appointments and services in Rajkot.',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const encodedMessage = encodeURIComponent(customMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-luxury border border-laposh-border p-4 animate-fade-in relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close message popup"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
              LP
            </div>
            <div>
              <h5 className="font-semibold text-xs text-laposh-text">La Posh Studio & Academy</h5>
              <p className="text-[10px] text-emerald-600 font-medium">● Online | Kalavad Road, Rajkot</p>
            </div>
          </div>
          <p className="text-xs text-laposh-muted mb-3 bg-laposh-warm p-2.5 rounded-xl border border-laposh-border/60">
            Hi there! 👋 How can we help you look gorgeous today? Message us directly for appointments or course details.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-luxury hover:shadow-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 focus:outline-none"
          aria-label="Contact La Posh on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          {/* Notification Ping */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
          </span>
        </button>

        {/* Hover Tooltip when bubble is closed */}
        {!isOpen && (
          <div className="hidden group-hover:block absolute right-16 top-3 px-3 py-1.5 bg-laposh-text text-white text-xs font-medium rounded-lg shadow-md whitespace-nowrap">
            Chat on WhatsApp
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
