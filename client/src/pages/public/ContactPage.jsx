import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to WhatsApp with prefilled message
    const msg = encodeURIComponent(
      `Hello Khan Hair Xpenso, my name is ${formData.name} (Phone: ${formData.phone}). ${formData.message}`
    );
    window.open(`https://wa.me/919812362083?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Contact & Location | Khan Hair Xpenso Kurukshetra"
        description="Contact Khan Hair Xpenso - The Beauty Salon & Training at SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana. Call +91 98123 62083 or message on WhatsApp."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text mt-1">
            Visit Us or Connect
          </h1>
          <p className="text-xs sm:text-sm text-laposh-muted mt-2">
            Have questions about appointments, hair styling, bridal makeup, or beauty training? Our Kurukshetra salon team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Business Details Card */}
          <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-10 shadow-luxury space-y-6">
            <h3 className="font-serif text-2xl font-bold text-laposh-text">
              Khan Hair Xpenso - The Beauty Salon & Training
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Salon Address:</p>
                  <p className="text-laposh-muted mt-0.5 leading-relaxed">
                    SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118 (Located in: Nike Store)
                  </p>
                  <a
                    href="https://maps.google.com/?q=Khan+Hair+Xpenso+Kurukshetra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-laposh-gold font-semibold hover:underline"
                  >
                    Open in Google Maps & Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <Clock className="w-5 h-5 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Opening Hours:</p>
                  <p className="text-laposh-muted mt-0.5">Monday – Sunday: 10:00 AM – 9:30 PM</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Open 7 Days a Week</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <Phone className="w-5 h-5 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Call Us Directly:</p>
                  <a
                    href="tel:+919812362083"
                    className="text-laposh-gold font-bold text-sm hover:underline"
                  >
                    +91 98123 62083
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">WhatsApp Chat:</p>
                  <a
                    href="https://wa.me/919812362083"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    +91 98123 62083 (Instant WhatsApp Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <Instagram className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Instagram:</p>
                  <a
                    href="https://www.instagram.com/khanhairxpenso_kkr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-700 font-semibold hover:underline"
                  >
                    @khanhairxpenso_kkr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <span className="w-5 h-5 font-bold text-blue-600 flex items-center justify-center shrink-0 mt-0.5">f</span>
                <div>
                  <p className="font-bold text-laposh-text text-sm">Facebook:</p>
                  <a
                    href="https://www.facebook.com/khanhairxpensothebeautysalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    khanhairxpensothebeautysalon (4.3★ Rating)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-10 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-laposh-text mb-2">Send a Message</h3>
            <p className="text-xs text-laposh-muted mb-6">
              Write your inquiry below to immediately connect with our desk via WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-laposh-text mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-laposh-border text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <div>
                <label className="block font-semibold text-laposh-text mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-laposh-border text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <div>
                <label className="block font-semibold text-laposh-text mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-laposh-border text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold tracking-wider uppercase text-xs shadow-subtle transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="mt-16 h-96 rounded-3xl overflow-hidden border border-laposh-border shadow-luxury">
          <iframe
            title="Khan Hair Xpenso Location Map"
            src="https://maps.google.com/maps?q=SCO-55,+56,+Kessal+Mall,+Sector+17,+Kurukshetra,+Haryana+136118&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
