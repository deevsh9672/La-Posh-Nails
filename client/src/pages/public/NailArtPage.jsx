import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { servicesAPI, galleryAPI } from '../../services/api';
import ServiceCard from '../../components/common/ServiceCard';
import SEOHead from '../../components/common/SEOHead';

export const NailArtPage = () => {
  const [nailServices, setNailServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const loadNailData = async () => {
      try {
        const [srvRes, galRes] = await Promise.all([
          servicesAPI.getAll({ activeOnly: 'true' }),
          galleryAPI.getAll({ publishedOnly: 'true' }),
        ]);

        if (srvRes.data?.success) {
          const filtered = srvRes.data.data.filter((s) =>
            [
              'Acrylic Nail Extensions',
              'Nail Extensions',
              'Custom Nail Art',
              'Nail Repair',
              'Manicure',
              'Pedicure',
              'Nail Polish Changes',
              'Polish Removal',
            ].includes(s.category)
          );
          setNailServices(filtered);
        }

        if (galRes.data?.success) {
          const nailArtCategories = [
            'French Nails',
            'Chrome Nails',
            'Nude Nail Designs',
            'Bridal Nails',
            'Glitter Nails',
            'Floral Nail Art',
            'Festive Nail Designs',
            'Acrylic Extensions',
          ];
          setGalleryItems(galRes.data.data.filter((g) => nailArtCategories.includes(g.category)));
        }
      } catch (err) {
        console.warn('Nail data load error:', err.message);
      }
    };
    loadNailData();
  }, []);

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Nail Extensions & Custom Nail Art | Khan Hair Xpenso Kurukshetra"
        description="Sculpted acrylic nail extensions, chrome nails, French manicures, and bespoke 3D bridal nail art in Kurukshetra at Khan Hair Xpenso."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                Signature Nail Artistry
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text leading-tight">
                Sculpted Nails Crafted With Flawless Precision.
              </h1>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Whether you adore minimal French tips, high-voltage mirror chrome, or bespoke hand-painted bridal masterpieces, our master technicians in Kurukshetra blend medical-grade hygiene with international artistry.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                {[
                  '100% Acid-free, non-damaging European & US nail formulas',
                  'Hospital-grade autoclave tool sterilization for every guest',
                  'Custom nail shaping: Almond, Stiletto, Coffin, Oval & Square',
                  'Long-lasting wear with zero lifting for 3 to 5 weeks',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Nail Appointment</span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80"
                alt="Chrome & Acrylic Nails Khan Hair Xpenso Kurukshetra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Nail Styles Showcase */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              Popular Styles
            </span>
            <h2 className="font-serif text-3xl font-bold text-laposh-text mt-1">
              Trending Nail Designs
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'French Tips', desc: 'Timeless micro & classic smile lines' },
              { title: 'Mirror Chrome', desc: 'Glazed donut & metallic sheen' },
              { title: 'Bridal Crimson', desc: 'Intricate gold leaf & Swarovski' },
              { title: 'Festive Art', desc: 'Navratri & celebratory vibrancy' },
            ].map((style, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-laposh-border shadow-subtle text-center hover:border-laposh-gold transition-colors"
              >
                <Sparkles className="w-6 h-6 text-laposh-gold mx-auto mb-2" />
                <h4 className="font-serif text-sm font-bold text-laposh-text">{style.title}</h4>
                <p className="text-[11px] text-laposh-muted mt-1">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nail Services List */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-laposh-text">
              Nail Treatments & Overlays
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nailServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>

        {/* Gallery Snippet */}
        {galleryItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-laposh-text">Recent Studio Work</h3>
              <Link to="/gallery" className="text-xs font-semibold text-laposh-gold hover:underline">
                View Full Gallery →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {galleryItems.slice(0, 6).map((item) => (
                <div key={item._id} className="aspect-square rounded-xl overflow-hidden border border-laposh-border bg-white shadow-xs">
                  <img src={item.imageUrl} alt={item.altText} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NailArtPage;
