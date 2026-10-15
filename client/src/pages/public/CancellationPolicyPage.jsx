import React from 'react';
import SEOHead from '../../components/common/SEOHead';
import { Phone, MessageCircle } from 'lucide-react';

export const CancellationPolicyPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Cancellation & Rescheduling Policy | La Posh Rajkot"
        description="Guidelines on canceling or rescheduling your appointments at La Posh Nails Studio Rajkot."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury space-y-6 text-xs text-laposh-muted leading-relaxed">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mb-4">
            Cancellation & Rescheduling Policy
          </h1>
          <p className="text-[11px] text-laposh-gold font-medium">Last updated: October 2026</p>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">1. Cancellation Window</h2>
            <p>
              We understand that plans can change unexpectedly. We respectfully request at least <strong>4 hours advance notice</strong> if you need to cancel or reschedule your salon appointment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">2. How to Cancel or Reschedule</h2>
            <p>
              To adjust your reservation, simply message us on WhatsApp with your Booking Reference number (e.g. <code>LP-XXXXXXXX-XXXX</code>) or call us directly at <strong>+91 95123 48787</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">3. Late Arrivals & No-Shows</h2>
            <p>
              Because our artists allocate dedicated time slots for precision nail extension application and intricate nail art, arrivals delayed by more than 15 minutes may have their service simplified or rescheduled to respect waiting guests.
            </p>
          </section>

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="tel:+919512348787"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-laposh-gold text-white text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Salon Desk (+91 95123 48787)</span>
            </a>

            <a
              href="https://wa.me/919512348787?text=Hello%20La%20Posh,%20I%20would%20like%20to%20reschedule/cancel%20my%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
