import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, ZoomIn } from 'lucide-react';
import { galleryAPI } from '../../services/api';
import SEOHead from '../../components/common/SEOHead';

const categories = [
  'All',
  'French Nails',
  'Chrome Nails',
  'Nude Nail Designs',
  'Bridal Nails',
  'Glitter Nails',
  'Floral Nail Art',
  'Festive Nail Designs',
  'Acrylic Extensions',
  'Makeup & Hairstyles',
];

export const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await galleryAPI.getAll({ publishedOnly: 'true' });
        if (res.data?.success) {
          setImages(res.data.data);
        }
      } catch (err) {
        console.warn('Gallery load error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = images.filter((img) =>
    selectedCategory === 'All' ? true : img.category === selectedCategory
  );

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Nail Art & Salon Gallery | La Posh Rajkot"
        description="Browse our portfolio of French tips, mirror chrome nails, bridal nail art, acrylic extensions, and hairstyles created in Rajkot."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
            Visual Inspiration
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text mt-1">
            Our Work & Client Gallery
          </h1>
          <p className="text-xs sm:text-sm text-laposh-muted mt-2">
            Explore authentic transformations from our Kalavad Road studio. Filter by your favorite aesthetic and save references for your next visit.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center no-scrollbar">
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

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-laposh-muted">
            <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
            <p className="text-xs">Loading studio gallery...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-20 text-center text-xs text-laposh-muted border border-dashed rounded-3xl bg-white p-8">
            No images in this category yet. Please check other categories.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((img) => (
              <div
                key={img._id}
                onClick={() => setActiveModalImage(img)}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-laposh-border bg-white shadow-subtle hover:shadow-luxury cursor-pointer transition-all duration-300"
              >
                <img
                  src={img.imageUrl}
                  alt={img.altText || img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <div className="self-end p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-laposh-gold-light">
                      {img.category}
                    </span>
                    <h4 className="font-serif text-xs font-semibold leading-snug">{img.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] bg-laposh-warm overflow-hidden">
              <img
                src={activeModalImage.imageUrl}
                alt={activeModalImage.altText || activeModalImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-laposh-gold">
                {activeModalImage.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-laposh-text mt-1">
                {activeModalImage.title}
              </h3>
              <p className="text-xs text-laposh-muted mt-2">{activeModalImage.altText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
