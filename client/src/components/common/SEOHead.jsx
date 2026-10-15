import React, { useEffect } from 'react';

export const SEOHead = ({
  title = 'La Posh Nails Studio & Makeup Hairstyles Academy | Rajkot',
  description = 'Premier nail salon and beauty academy in Rajkot, Gujarat. Specializing in acrylic extensions, custom nail art, bridal makeup, and professional beauty courses.',
  canonicalUrl = window.location.href,
}) => {
  useEffect(() => {
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Add or update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Inject JSON-LD Schema for LocalBusiness / BeautySalon
    const schemaId = 'laposh-local-business-schema';
    let scriptTag = document.getElementById(schemaId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'La Posh Nails Studio & Makeup Hairstyles Academy',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
      '@id': 'https://laposhbeauty.com',
      url: 'https://laposhbeauty.com',
      telephone: '+919512348787',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical',
        addressLocality: 'Rajkot',
        addressRegion: 'Gujarat',
        postalCode: '360005',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.2858,
        longitude: 70.7719,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '20:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.3',
        reviewCount: '189',
      },
      sameAs: ['https://www.instagram.com/laposh_nails_and_salon/'],
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, canonicalUrl]);

  return null;
};

export default SEOHead;
