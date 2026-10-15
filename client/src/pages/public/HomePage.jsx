import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  GraduationCap,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { servicesAPI, galleryAPI } from '../../services/api';
import ServiceCard from '../../components/common/ServiceCard';
import SEOHead from '../../components/common/SEOHead';

export const HomePage = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [servicesRes, galleryRes] = await Promise.all([
          servicesAPI.getAll({ activeOnly: 'true' }),
          galleryAPI.getAll({ publishedOnly: 'true' }),
        ]);

        if (servicesRes.data?.success) {
          setFeaturedServices(servicesRes.data.data.slice(0, 6));
        }
        if (galleryRes.data?.success) {
          setGalleryItems(galleryRes.data.data.slice(0, 6));
        }
      } catch (err) {
        console.warn('Error loading home data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div>
      <SEOHead
        title="La Posh Nails Studio & Academy | Rajkot - Where Beauty Meets Artistry"
        description="Discover beautiful nail art, stunning hairstyles, professional makeup, and certified nail art education at La Posh on Kalavad Road, Rajkot. Book your appointment online."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-white via-laposh-warm to-laposh-blush/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Hero Content */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Google Rating Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-laposh-border shadow-xs text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="ml-1 font-bold text-laposh-text">4.3 / 5</span>
                </div>
                <span className="text-laposh-muted">• 189 Verified Google Reviews</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-laposh-text leading-[1.15]">
                Where Beauty <br />
                <span className="text-gold-gradient italic font-normal">Meets Artistry.</span>
              </h1>

              <p className="text-sm sm:text-base text-laposh-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover beautiful nail art, stunning hairstyles, professional makeup, and nail art education at La Posh in Rajkot. Indulge in bespoke luxury, tailored exclusively for you.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-luxury hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-laposh-warm border border-laposh-border text-laposh-text text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
                >
                  <span>Explore Services</span>
                </Link>

                <Link
                  to="/courses-academy"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-laposh-blush/60 hover:bg-laposh-blush text-laposh-text text-xs font-semibold tracking-wider uppercase border border-laposh-gold/30 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-laposh-gold" />
                  <span>Explore Academy</span>
                </Link>
              </div>

              {/* Studio Highlights Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-laposh-border/70 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl font-bold text-laposh-text">100%</p>
                  <p className="text-[11px] text-laposh-muted">Hygienic & Sterilized</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-laposh-text">189+</p>
                  <p className="text-[11px] text-laposh-muted">Happy Clients in Rajkot</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-laposh-text">Govt.</p>
                  <p className="text-[11px] text-laposh-muted">Certified Academy</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Collage */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80"
                    alt="La Posh Nails Studio Rajkot"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-luxury border border-laposh-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-laposh-blush flex items-center justify-center text-laposh-gold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-laposh-text">Rajkot’s Premier Nail Studio</p>
                    <p className="text-[10px] text-laposh-muted">Kalavad Road • Royal Park</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                Tailored Beauty Services
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mt-1">
                Curated Luxury Treatments
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-laposh-gold hover:text-laposh-gold-dark"
            >
              <span>View All 12 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. NAIL ART GALLERY PREVIEW */}
      <section className="py-20 bg-laposh-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              Visual Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mt-1">
              Signature Nail Art Portfolio
            </h2>
            <p className="text-xs text-laposh-muted mt-2">
              Explore French tips, mirror chrome, bridal nails, and festive acrylic extensions created at our Rajkot salon.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-laposh-border bg-white shadow-subtle hover:shadow-luxury transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-laposh-gold-light">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm font-semibold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-laposh-warm border border-laposh-border text-laposh-text text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 text-laposh-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ACADEMY PROMOTION BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-laposh-warm via-laposh-blush/40 to-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-laposh-gold text-white shadow-xs">
                  Academy Admissions Open
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text leading-tight">
                  “Turn Your Passion for Nail Art Into a Profession.”
                </h2>
                <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                  Join Rajkot’s most comprehensive nail artistry and beauty curriculum. Learn acrylic sculpted extensions, gel chemistry, 3D designs, salon hygiene, and client consulting under expert mentorship.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hands-on Live Model Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Professional Kit & Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Government Recognized Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Salon Business Guidance</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/courses-academy"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle transition-all"
                  >
                    <span>View Curriculum & Enroll</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/919512348787?text=${encodeURIComponent(
                      'Hello La Posh Academy, I want to enquire about nail art courses and upcoming batches.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-laposh-border bg-white text-laposh-text text-xs font-semibold tracking-wider uppercase hover:border-laposh-gold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Academy Counselor</span>
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                    alt="La Posh Nails Academy Training"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED GOOGLE REVIEWS SECTION */}
      <section className="py-20 bg-laposh-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              Real Client Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text mt-1">
              Loved by Clients in Rajkot
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-laposh-text">4.3 / 5 Rating</span>
              <span className="text-xs text-laposh-muted">• 189 Reviews on Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Kavita Dave',
                review: 'Got my bridal nail extensions done here for my wedding. The precision, shaping, and Swarovski placement lasted over 4 weeks without any chipping! Best nail studio in Rajkot on Kalavad Road.',
                service: 'Bridal Nail Extensions',
              },
              {
                name: 'Pooja Jadeja',
                review: 'I completed the professional nail art course at La Posh Academy. The mentor taught step-by-step techniques for acrylic, gel, and 3D floral art. Now I have my own thriving client base!',
                service: 'Academy Student',
              },
              {
                name: 'Neha Joshi',
                review: 'Super clean, luxurious atmosphere. They take sanitation seriously and sterilized every single tool right before my manicure. Highly recommended for party makeup and custom nails.',
                service: 'Party Makeup & Chrome Nails',
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-laposh-border shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-laposh-muted leading-relaxed italic mb-4">
                    “{rev.review}”
                  </p>
                </div>
                <div className="pt-3 border-t border-laposh-border/60 flex items-center justify-between">
                  <div>
                    <h5 className="font-serif text-xs font-bold text-laposh-text">{rev.name}</h5>
                    <p className="text-[10px] text-laposh-gold font-medium">{rev.service}</p>
                  </div>
                  <span className="text-[10px] text-gray-400">Verified Client</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-laposh-gold hover:underline"
            >
              <span>Read More Verified Reviews & Google Feedback</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. LOCATION & CONTACT HIGHLIGHT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                Find Us in Rajkot
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-laposh-text">
                Conveniently Located on Kalavad Road
              </h2>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Visit our luxurious salon and academy in the heart of Rajkot. Located at Pride Corporate opposite Krishna Medical with convenient parking and accessibility.
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-laposh-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-laposh-text">Studio Address:</p>
                    <p className="text-laposh-muted">
                      102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical, Rajkot, Gujarat 360005
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-laposh-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-laposh-text">Business Hours:</p>
                    <p className="text-laposh-muted">Monday – Sunday: 10:00 AM – 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-laposh-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-laposh-text">Direct Inquiries & Bookings:</p>
                    <a
                      href="tel:+919512348787"
                      className="text-laposh-gold font-bold hover:underline"
                    >
                      +91 95123 48787
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/book-appointment"
                  className="px-6 py-3 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Book Appointment
                </Link>
                <a
                  href="https://maps.google.com/?q=102+Pride+Corporate+Kalavad+Road+Rajkot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-laposh-border hover:bg-laposh-warm text-laposh-text text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="h-80 sm:h-96 rounded-3xl overflow-hidden border border-laposh-border shadow-luxury">
              <iframe
                title="La Posh Nails Studio Location Map"
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
      </section>
    </div>
  );
};

export default HomePage;
