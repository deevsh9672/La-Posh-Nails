import React, { useEffect } from 'react';

export const SEOHead = ({
  title = 'Khan Hair Xpenso - The Beauty Salon & Training | Kurukshetra',
  description = 'Local beauty salon in Kurukshetra offering haircuts, hair spa, nail extensions, bridal makeup, and certified beauty training.',
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
    const schemaId = 'khanhairxpenso-local-business-schema';
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
      name: 'Khan Hair Xpenso - The Beauty Salon & Training',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
      '@id': 'http://khanhairxpenso.com/',
      url: 'http://khanhairxpenso.com/',
      telephone: '+919812362083',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'SCO-55, 56, Kessal Mall, Sector 17',
        addressLocality: 'Kurukshetra',
        addressRegion: 'Haryana',
        postalCode: '136118',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.9695,
        longitude: 76.8783,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '21:30',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '3.9',
        reviewCount: '301',
      },
      sameAs: [
        'https://www.instagram.com/khanhairxpenso_kkr/',
        'https://www.facebook.com/khanhairxpensothebeautysalon',
        'http://khanhairxpenso.com/',
      ],
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, canonicalUrl]);

  return null;
};

export default SEOHead;
