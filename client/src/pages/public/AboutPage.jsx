import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, Star, MapPin, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';

export const AboutPage = () => {
  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="About Us | Khan Hair Xpenso - The Beauty Salon & Training"
        description="Learn about Khan Hair Xpenso - The Beauty Salon & Training in Kurukshetra, Haryana. Discover our dedication to haircare, haircuts, rejuvenating hair spa, bridal styling, and professional training."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                The Khan Hair Xpenso Story
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text leading-tight">
                Crafting Confidence Through Artistry & Care.
              </h1>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Founded in Kurukshetra, Haryana, <strong>Khan Hair Xpenso - The Beauty Salon & Training</strong> was established with a singular vision: to deliver world-class hair styling, rejuvenating hair spa, bespoke nail artistry, bridal makeovers, and accredited vocational salon training.
              </p>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Located conveniently at <strong>SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra (in Nike Store)</strong>, our salon provides a welcoming sanctuary where clients enjoy tailored pampering executed with hospital-grade hygiene standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-laposh-warm border border-laposh-border text-center">
                  <p className="font-serif text-3xl font-bold text-laposh-gold">3.9 / 5</p>
                  <p className="text-xs font-semibold text-laposh-text mt-1">Google Rating</p>
                  <p className="text-[10px] text-laposh-muted">From 301+ Google Reviews</p>
                </div>
                <div className="p-4 rounded-2xl bg-laposh-warm border border-laposh-border text-center">
                  <p className="font-serif text-3xl font-bold text-laposh-gold">100%</p>
                  <p className="text-xs font-semibold text-laposh-text mt-1">Sterilized Tools</p>
                  <p className="text-[10px] text-laposh-muted">Hospital Grade Hygiene</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
                alt="Khan Hair Xpenso Ambience Kurukshetra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-laposh-text mt-1">
              What Sets Khan Hair Xpenso Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-laposh-border shadow-subtle">
              <ShieldCheck className="w-8 h-8 text-laposh-gold mb-4" />
              <h3 className="font-serif text-lg font-bold text-laposh-text mb-2">Uncompromising Hygiene</h3>
              <p className="text-xs text-laposh-muted leading-relaxed">
                We believe beauty should never compromise wellness. Our instruments undergo hospital-grade dry heat & autoclave sterilization, sealed in sterile pouches opened right in front of you.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-laposh-border shadow-subtle">
              <Sparkles className="w-8 h-8 text-laposh-gold mb-4" />
              <h3 className="font-serif text-lg font-bold text-laposh-text mb-2">Master Artistry</h3>
              <p className="text-xs text-laposh-muted leading-relaxed">
                Our stylists and technicians are continuously upskilled in global trends: precision haircutting, nourishing hair spa treatments, and bridal couture transformations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-laposh-border shadow-subtle">
              <Award className="w-8 h-8 text-laposh-gold mb-4" />
              <h3 className="font-serif text-lg font-bold text-laposh-text mb-2">Empowering Education</h3>
              <p className="text-xs text-laposh-muted leading-relaxed">
                Through Khan Hair Xpenso Training Academy, we foster aspiring artists and entrepreneurs across Haryana with hands-on technical skills and business acumen to launch successful beauty careers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
