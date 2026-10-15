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
      `Hello La Posh, my name is ${formData.name} (Phone: ${formData.phone}). ${formData.message}`
    );
    window.open(`https://wa.me/919512348787?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Contact & Location | La Posh Nails Studio Rajkot"
        description="Contact La Posh Nails Studio & Academy at 102 Pride Corporate, Kalavad Road, Rajkot. Call +91 95123 48787 or message on WhatsApp."
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
            Have questions about bridal dates, nail extension pricing, or academy admissions? Our Rajkot studio team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Business Details Card */}
          <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-10 shadow-luxury space-y-6">
            <h3 className="font-serif text-2xl font-bold text-laposh-text">
              La Posh Nails Studio & Academy
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Studio Address:</p>
                  <p className="text-laposh-muted mt-0.5 leading-relaxed">
                    102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical, Rajkot, Gujarat 360005
                  </p>
                  <a
                    href="https://maps.google.com/?q=102+Pride+Corporate+Kalavad+Road+Rajkot"
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
                  <p className="text-laposh-muted mt-0.5">Monday – Sunday: 10:00 AM – 8:00 PM</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Open 7 Days a Week</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <Phone className="w-5 h-5 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Call Us Directly:</p>
                  <a
                    href="tel:+919512348787"
                    className="text-laposh-gold font-bold text-sm hover:underline"
                  >
                    +91 95123 48787
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">WhatsApp Chat:</p>
                  <a
                    href="https://wa.me/919512348787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    +91 95123 48787 (Instant WhatsApp Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-laposh-border/60">
                <Instagram className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-laposh-text text-sm">Instagram:</p>
                  <a
                    href="https://www.instagram.com/laposh_nails_and_salon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-700 font-semibold hover:underline"
                  >
                    @laposh_nails_and_salon
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
            title="La Posh Nails Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.874533036814!2d70.77190001496738!3d22.285800085331078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca780f2d123b%3A0x8e87496d0be220f!2sPride%20Corporate%2C%20Kalavad%20Rd%2C%20Rajkot%2C%20Gujarat%20360005!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
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
