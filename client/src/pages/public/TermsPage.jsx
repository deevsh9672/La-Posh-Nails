import React from 'react';
import SEOHead from '../../components/common/SEOHead';

export const TermsPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Terms & Conditions | La Posh Nails Studio & Academy"
        description="Terms of service and booking conditions for La Posh Nails Studio & Academy in Rajkot, Gujarat."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury space-y-6 text-xs text-laposh-muted leading-relaxed">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[11px] text-laposh-gold font-medium">Last updated: October 2026</p>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">1. Appointment Scheduling</h2>
            <p>
              Online appointment requests generated through our website are subject to final confirmation by La Posh Nails Studio. A reservation is marked confirmed once our team verifies availability and contacts you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">2. Salon Etiquette & Arrival</h2>
            <p>
              Please arrive 5 to 10 minutes prior to your scheduled time slot to facilitate sanitary preparation and consultation. Arrivals exceeding 15 minutes late may require rescheduling to avoid delaying subsequent clients.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">3. Pricing & Services</h2>
            <p>
              Service rates, package quotes, and course fees reflect standard treatments. Specialized customizations (e.g. Swarovski crystals, complex 3D nail art, extra hair extensions) are quoted by your artist during the in-person consultation prior to commencement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">4. Studio Location</h2>
            <p>
              All salon services and academy classes are held at 102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical, Rajkot, Gujarat 360005, unless bridal home services have been contracted in advance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
