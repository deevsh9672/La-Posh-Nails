import React from 'react';
import SEOHead from '../../components/common/SEOHead';

export const PrivacyPolicyPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Privacy Policy | Khan Hair Xpenso - The Beauty Salon & Training"
        description="Privacy policy and data protection standards for clients of Khan Hair Xpenso in Kurukshetra, Haryana."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury space-y-6 text-xs text-laposh-muted leading-relaxed">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-[11px] text-laposh-gold font-medium">Last updated: October 2026</p>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">1. Information We Collect</h2>
            <p>
              When you book an appointment or submit a training course enquiry with <strong>Khan Hair Xpenso - The Beauty Salon & Training</strong>, we collect your name, mobile phone number, email address, preferred appointment time, and service preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">2. How We Use Your Data</h2>
            <p>
              Your contact details are strictly used to schedule, manage, and confirm your salon appointments, provide booking reminders, and communicate details about academy admissions. We never sell, rent, or trade customer contact details with third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">3. WhatsApp Communications</h2>
            <p>
              By submitting your phone number on our booking or academy enquiry forms, you authorize Khan Hair Xpenso to send appointment confirmation details and customer service messages via WhatsApp or SMS.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-laposh-text">4. Contact & Inquiries</h2>
            <p>
              For privacy-related questions or to request deletion of your booking history, please contact our salon desk at SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118 or via phone at +91 98123 62083.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
