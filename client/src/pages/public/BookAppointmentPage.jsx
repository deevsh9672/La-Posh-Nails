import React from 'react';
import BookingWizard from '../../components/booking/BookingWizard';
import SEOHead from '../../components/common/SEOHead';
import { ShieldCheck, Clock, Phone, MapPin } from 'lucide-react';

export const BookAppointmentPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Book Appointment Online | Khan Hair Xpenso Kurukshetra"
        description="Book your haircut, hair spa, nail extensions, custom nail art, or bridal makeup appointment online at Khan Hair Xpenso in Kurukshetra with real-time slot availability."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
            Reserve Your Experience
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text mt-1">
            Book an Appointment
          </h1>
          <p className="text-xs sm:text-sm text-laposh-muted mt-2">
            Select your preferred treatment, date, and live available slot. No advance online payment required; our team will verify your slot immediately.
          </p>
        </div>

        {/* The Live Booking Wizard */}
        <BookingWizard />

        {/* Reassurance Bar */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-laposh-muted">
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-laposh-border">
            <Clock className="w-5 h-5 text-laposh-gold mb-2" />
            <p className="font-bold text-laposh-text">Instant Slot Hold</p>
            <p className="text-[11px] mt-0.5">Real-time availability prevents double-booking</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-laposh-border">
            <ShieldCheck className="w-5 h-5 text-laposh-gold mb-2" />
            <p className="font-bold text-laposh-text">Zero Pre-payment</p>
            <p className="text-[11px] mt-0.5">Pay conveniently at the studio after your service</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-laposh-border">
            <Phone className="w-5 h-5 text-laposh-gold mb-2" />
            <p className="font-bold text-laposh-text">WhatsApp Confirmation</p>
            <p className="text-[11px] mt-0.5">Quick notifications and friendly reminders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
