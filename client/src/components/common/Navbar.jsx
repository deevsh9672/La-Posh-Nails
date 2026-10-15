import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Nail Art', path: '/nail-art' },
    { name: 'Makeup & Hair', path: '/makeup-hairstyles' },
    { name: 'Bridal', path: '/bridal-beauty' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Academy', path: '/courses-academy' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-laposh-border/60 py-3'
          : 'bg-white border-b border-laposh-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-laposh-text group-hover:text-laposh-gold transition-colors">
              La Posh
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-laposh-gold -mt-1">
              Nails Studio & Academy
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[13px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-laposh-gold font-semibold border-b-2 border-laposh-gold'
                      : 'text-laposh-text hover:text-laposh-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919512348787"
              className="flex items-center gap-1.5 text-xs font-semibold text-laposh-text hover:text-laposh-gold transition-colors px-2 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-laposh-gold" />
              <span>+91 95123 48787</span>
            </a>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle hover:shadow-luxury transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <Link
              to="/book-appointment"
              className="px-3.5 py-1.5 rounded-full bg-laposh-gold text-white text-[11px] font-semibold tracking-wider uppercase"
            >
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-laposh-text hover:text-laposh-gold focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-laposh-border px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-laposh-blush/40 text-laposh-gold font-semibold'
                      : 'text-laposh-text hover:bg-laposh-warm'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-laposh-border space-y-2">
            <a
              href="tel:+919512348787"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-laposh-border text-sm font-semibold text-laposh-text"
            >
              <Phone className="w-4 h-4 text-laposh-gold" />
              <span>Call +91 95123 48787</span>
            </a>

            <Link
              to="/book-appointment"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-laposh-gold text-white text-sm font-semibold tracking-wider uppercase shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
