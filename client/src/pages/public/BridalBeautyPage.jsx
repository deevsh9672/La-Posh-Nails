import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MessageCircle, Check, Crown, Heart, Star } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

export const BridalBeautyPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Luxury Bridal Makeup & Wedding Packages | Khan Hair Xpenso Kurukshetra"
        description="Exclusive bridal beauty packages in Kurukshetra: Royal HD makeup, Swarovski bridal nail extensions, intricate hair styling, and couture dupatta draping."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bridal Hero */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-laposh-blush/60 border border-laposh-gold/30 text-xs text-laposh-gold-dark font-semibold">
                <Crown className="w-3.5 h-3.5 text-laposh-gold" />
                <span>The Royal Bride Experience</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text leading-tight">
                Your Dream Bridal Transformation Awaits.
              </h1>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Your wedding day is one of the most treasured milestones of your life. At Khan Hair Xpenso in Kurukshetra, we craft ethereal bridal looks that harmonize traditional heritage with modern haute couture refinement.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                {[
                  'Bespoke Bridal Nail Extension Set with customized wedding motif',
                  'Waterproof, tear-proof HD airbrush makeup for high-res photography',
                  'Ornate bridal hairstyles, fresh flower setting & mathapatti fixing',
                  'Couture lehenga & dupatta draping (North Indian, Royal Rajasthani, Classic)',
                  'Pre-bridal skin glow consultation & trial session',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3.5">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Bridal Date</span>
                </Link>

                <a
                  href={`https://wa.me/919812362083?text=${encodeURIComponent(
                    'Hello Khan Hair Xpenso, I want to enquire about Bridal Packages and availability for my wedding date.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Bridal Consultant</span>
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80"
                alt="Bridal Makeup and Hair Styling Khan Hair Xpenso Kurukshetra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bridal Journey 3 Steps */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              The Journey
            </span>
            <h2 className="font-serif text-3xl font-bold text-laposh-text mt-1">
              How We Perfect Your Bridal Look
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Personalized Consultation',
                desc: 'We review your bridal lehenga colors, jewelry, face symmetry, and wedding themes to architect a look uniquely yours.',
              },
              {
                step: '02',
                title: 'Bridal Nail Art & Prep',
                desc: '3 to 5 days prior, we sculpt your bridal nails with crystal embellishments and complete soothing hand/foot spa therapy.',
              },
              {
                step: '03',
                title: 'The Wedding Day Perfection',
                desc: 'A calm, luxurious pampering session in our private bridal suite ensuring you walk down the aisle feeling like royalty.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-laposh-border shadow-subtle hover:border-laposh-gold transition-colors"
              >
                <span className="font-serif text-3xl font-bold text-laposh-gold/60">{s.step}</span>
                <h4 className="font-serif text-lg font-bold text-laposh-text mt-3 mb-2">{s.title}</h4>
                <p className="text-xs text-laposh-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridalBeautyPage;
