import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Star, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-laposh-border pt-16 pb-8 text-laposh-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-laposh-border">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-laposh-text">
                Khan Hair Xpenso
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-medium text-laposh-gold">
                The Beauty Salon & Training
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-laposh-muted">
              Kurukshetra’s premier beauty destination for haircuts, rejuvenating hair spa, luxury nail extensions, bridal transformations, and certified salon training.
            </p>
            {/* Google Rating Badge */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-laposh-warm border border-laposh-border/70 max-w-fit">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="ml-1 text-xs font-bold text-laposh-text">3.9 / 5</span>
              </div>
              <span className="text-xs text-laposh-muted">• 301 Verified Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-laposh-text mb-4">Explore Studio</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-laposh-gold transition-colors">
                  All Services & Treatments
                </Link>
              </li>
              <li>
                <Link to="/nail-art" className="hover:text-laposh-gold transition-colors">
                  Signature Nail Art & Extensions
                </Link>
              </li>
              <li>
                <Link to="/makeup-hairstyles" className="hover:text-laposh-gold transition-colors">
                  Makeup & Haute Hairstyles
                </Link>
              </li>
              <li>
                <Link to="/bridal-beauty" className="hover:text-laposh-gold transition-colors">
                  Bridal Troussseau & HD Looks
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-laposh-gold transition-colors">
                  Client & Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/courses-academy" className="hover:text-laposh-gold transition-colors font-medium text-laposh-gold">
                  Academy Courses & Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Salon Hours & Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-laposh-text mb-4">Hours & Policies</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-laposh-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-laposh-text">Salon Timings</p>
                  <p>Monday – Sunday: 10:00 AM – 9:30 PM</p>
                </div>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-laposh-gold transition-colors">
                  Cancellation & Rescheduling Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-laposh-gold transition-colors">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-laposh-gold transition-colors">
                  Terms & Service Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurukshetra Location & Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-laposh-text mb-4">Visit Salon</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-laposh-gold shrink-0 mt-0.5" />
                <span>
                  SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118 (Located in: Nike Store)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-laposh-gold shrink-0" />
                <a href="tel:+919812362083" className="font-medium text-laposh-text hover:text-laposh-gold transition-colors">
                  +91 98123 62083
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href="https://www.instagram.com/khanhairxpenso_kkr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-laposh-warm border border-laposh-border text-laposh-text hover:text-laposh-gold hover:border-laposh-gold transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span className="font-medium">@khanhairxpenso_kkr</span>
                </a>
                <a
                  href="https://www.facebook.com/khanhairxpensothebeautysalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-laposh-warm border border-laposh-border text-laposh-text hover:text-laposh-gold hover:border-laposh-gold transition-all"
                >
                  <span className="font-bold text-blue-600 text-xs">f</span>
                  <span className="font-medium">Facebook (4.3★)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Khan Hair Xpenso - The Beauty Salon & Training. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/book-appointment" className="text-laposh-gold font-semibold hover:underline">
              Book Online
            </Link>
            <Link to="/admin/login" className="text-gray-400 hover:text-gray-600 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
