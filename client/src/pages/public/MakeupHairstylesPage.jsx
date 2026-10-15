import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Check, ArrowRight, Heart, Scissors } from 'lucide-react';
import { servicesAPI } from '../../services/api';
import ServiceCard from '../../components/common/ServiceCard';
import SEOHead from '../../components/common/SEOHead';

export const MakeupHairstylesPage = () => {
  const [makeupServices, setMakeupServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesAPI.getAll({ activeOnly: 'true' });
        if (res.data?.success) {
          const filtered = res.data.data.filter((s) =>
            ['Natural Makeup', 'Party Makeup', 'Bridal Makeup', 'Professional Hairstyles'].includes(s.category)
          );
          setMakeupServices(filtered);
        }
      } catch (err) {
        console.warn('Error fetching makeup services:', err.message);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Hair Styling, Haircuts & Makeup | Khan Hair Xpenso Kurukshetra"
        description="Signature haircuts, rejuvenating hair spa, HD makeup, and couture hairstyles for events and celebrations in Kurukshetra."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                Luminous Transformations
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text leading-tight">
                Modern Glamour, Tailored to Your Natural Glow.
              </h1>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                From precision haircuts, refreshing hair spa treatments, soft dewy looks to high-definition evening glam, our master stylists in Kurukshetra use premium international products to ensure your look remains flawless.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                {[
                  'Custom skin prep & luxury primer for 16-hour sweat-proof wear',
                  'High Definition (HD) airbrush & camera-ready contouring',
                  'Couture hairstyling: Hollywood waves, textured buns, messy braids',
                  'Complimentary premium lashes & accessory placement',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Makeup Appointment</span>
                </Link>

                <Link
                  to="/bridal-beauty"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-laposh-border bg-laposh-warm hover:bg-laposh-blush/40 text-laposh-text text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Explore Bridal Trousseau</span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
                alt="Party and Evening Makeup Khan Hair Xpenso Kurukshetra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-laposh-text">
              Makeup & Hair Menu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {makeupServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupHairstylesPage;
