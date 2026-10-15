import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Filter, Loader2 } from 'lucide-react';
import { servicesAPI } from '../../services/api';
import ServiceCard from '../../components/common/ServiceCard';
import SEOHead from '../../components/common/SEOHead';

const categories = [
  'All',
  'Acrylic Nail Extensions',
  'Nail Extensions',
  'Custom Nail Art',
  'Nail Repair',
  'Manicure',
  'Pedicure',
  'Nail Polish Changes',
  'Polish Removal',
  'Natural Makeup',
  'Party Makeup',
  'Bridal Makeup',
  'Professional Hairstyles',
];

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await servicesAPI.getAll({ activeOnly: 'true' });
        if (res.data?.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.warn('Error loading services:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Beauty & Nail Art Services | La Posh Studio Rajkot"
        description="Explore our full menu of acrylic nail extensions, custom 3D nail art, spa manicures, HD bridal makeup, and hairstyling in Rajkot."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
            Bespoke Beauty Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text mt-1">
            Studio Services & Treatments
          </h1>
          <p className="text-xs sm:text-sm text-laposh-muted mt-3">
            Handcrafted nail extensions, rejuvenating spa treatments, and professional makeup designed to bring out your effortless radiance.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-10">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-laposh-gold absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search services (e.g. acrylic, manicure, bridal, party)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-laposh-border bg-white text-xs text-laposh-text focus:outline-none focus:ring-2 focus:ring-laposh-gold/40 shadow-xs"
            />
          </div>

          {/* Horizontal Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-laposh-gold text-white shadow-xs'
                    : 'bg-white border border-laposh-border text-laposh-text hover:bg-laposh-warm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-laposh-muted">
            <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
            <p className="text-xs">Loading services from database...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-20 text-center text-xs text-laposh-muted border border-dashed rounded-3xl bg-white p-8">
            No services found matching your filters. Try selecting "All" or altering your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
