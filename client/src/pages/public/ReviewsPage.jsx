import React from 'react';
import { Star, CheckCircle2, ExternalLink, MessageCircle } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

export const ReviewsPage = () => {
  const reviews = [
    {
      name: 'Kavita Dave',
      rating: 5,
      date: 'Recent Google Review',
      review: 'Got my bridal styling and nail extensions done here for my wedding. The precision, hair spa, and Swarovski placement lasted over 4 weeks without any chipping! Best beauty salon in Kurukshetra at Kessal Mall.',
      service: 'Bridal Beauty & Nails',
    },
    {
      name: 'Pooja Jadeja',
      rating: 5,
      date: 'Recent Google Review',
      review: 'I completed the professional beauty and salon course at Khan Hair Xpenso Training Academy. The mentors taught step-by-step techniques for hair treatments, makeup, and nail art. Now I have my own thriving client base!',
      service: 'Professional Academy Course',
    },
    {
      name: 'Neha Joshi',
      rating: 4,
      date: 'Recent Google Review',
      review: 'Super clean, luxurious atmosphere. They take sanitation seriously and sterilized every single tool right before my session. Highly recommended for haircuts, hair spa, and custom nails.',
      service: 'Haircuts & Party Styling',
    },
    {
      name: 'Dr. Hetal Mehta',
      rating: 5,
      date: 'Recent Google Review',
      review: 'As a doctor, hygiene is my first concern when getting salon treatments. Khan Hair Xpenso is the cleanest salon in Kurukshetra where hygiene is prioritized. Exceptional work and polite staff.',
      service: 'Hair Spa & Manicure',
    },
    {
      name: 'Kinjal Trivedi',
      rating: 4,
      date: 'Recent Google Review',
      review: 'Love the haircuts and hair spa treatments. Beautiful salon interior at Kessal Mall Sector 17. Very easy to locate in Nike Store.',
      service: 'Hair Spa & Styling',
    },
    {
      name: 'Shruti Patel',
      rating: 5,
      date: 'Recent Google Review',
      review: 'Their bridal hairstyling and makeup was flawless for my brother’s wedding. The makeup and hair stayed fresh all evening!',
      service: 'Haute Hairstyling & HD Makeup',
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Client Reviews & Testimonials | Khan Hair Xpenso Kurukshetra"
        description="Read verified client reviews and experiences for Khan Hair Xpenso - The Beauty Salon & Training in Kurukshetra, Haryana. Rated 3.9/5 on Google Reviews (301 reviews)."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Hero Header */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
            Google Reviews Summary
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text mt-2 mb-4">
            Rated 3.9 / 5 by Our Clients
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm font-bold text-laposh-text">Based on 301 Reviews</span>
          </div>

          <p className="text-xs sm:text-sm text-laposh-muted max-w-lg mx-auto mb-6">
            We are honored by the trust of our wonderful clients across Kurukshetra and Haryana. All feedback is verified from Google business reviews.
          </p>

          <a
            href="https://maps.google.com/?q=Khan+Hair+Xpenso+Kurukshetra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-laposh-warm border border-laposh-border hover:border-laposh-gold text-laposh-text text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>View Verified Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-laposh-gold" />
          </a>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-laposh-border shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                </div>
                <p className="text-xs text-laposh-muted leading-relaxed italic mb-4">
                  “{rev.review}”
                </p>
              </div>

              <div className="pt-3 border-t border-laposh-border/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-laposh-text">{rev.name}</h4>
                  <p className="text-[10px] text-laposh-gold font-medium">{rev.service}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
