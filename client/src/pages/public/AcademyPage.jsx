import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { enquiriesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

const curriculumModules = [
  {
    module: 'Module 01',
    title: 'Nail Preparation & Clinical Hygiene',
    topics: [
      'Sanitation protocols, autoclave sterilization & tool safety',
      'Nail plate anatomy, nail disorders, contraindications',
      'Cuticle prep using Russian e-file techniques and hand nippers',
    ],
  },
  {
    module: 'Module 02',
    title: 'Manicure Fundamentals & Natural Care',
    topics: [
      'Classic, Russian dry, and luxury spa manicure procedures',
      'Nail shaping: Almond, Square, Stiletto, Ballerina & Oval',
      'Long-lasting gel polish overlay application without peeling',
    ],
  },
  {
    module: 'Module 03',
    title: 'Acrylic & Gel Extension Systems',
    topics: [
      'Monomer & polymer chemistry, bead control, ratio balance',
      'Tip attachment vs. paper sculpting form customization',
      'Hard gel builder extensions and soft gel apex reinforcement',
    ],
  },
  {
    module: 'Module 04',
    title: 'Advanced 3D & Freehand Nail Art',
    topics: [
      'Chrome pigment burnishing, cat-eye magnetic effects, ombré',
      '3D acrylic sculpting: flowers, bows, festive Indian motifs',
      'Swarovski crystal placement, foil encapsulation, encapsulation',
    ],
  },
  {
    module: 'Module 05',
    title: 'Removal, Maintenance & Aftercare',
    topics: [
      'Damage-free e-file and soak-off debulking techniques',
      'Refills, rebalancing, and repairing broken natural nails',
      'Client aftercare advising & cuticle oil nourishment regimens',
    ],
  },
  {
    module: 'Module 06',
    title: 'Salon Business, Pricing & Client Consultation',
    topics: [
      'Conducting professional client consultations & service pricing',
      'Photography & lighting techniques for Instagram portfolios',
      'Starting your salon studio or freelance business in Gujarat',
    ],
  },
];

export const AcademyPage = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    courseInterest: 'Comprehensive Professional Nail Art Masterclass',
    skillLevel: 'Beginner',
    preferredBatch: 'Weekday Morning (10 AM - 1 PM)',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await enquiriesAPI.create(formData);
      if (res.data?.success) {
        setSubmitted(true);
        showToast('Enquiry submitted successfully! Our academy counselor will call you.', 'success');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <SEOHead
        title="Beauty & Salon Courses & Academy in Kurukshetra | Khan Hair Xpenso Training"
        description="Learn professional hair styling, haircuts, hair spa, nail extensions, 3D nail art, and salon management in Kurukshetra. Hands-on masterclasses with government certification."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-14 shadow-luxury mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-laposh-gold text-white shadow-xs">
                Khan Hair Xpenso Training Academy • Kurukshetra
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-laposh-text leading-tight">
                Turn Your Passion for Beauty & Hair Into a Profession.
              </h1>
              <p className="text-xs sm:text-sm text-laposh-muted leading-relaxed">
                Step into the high-growth luxury beauty industry. Our intensive academy program in Kurukshetra provides real live-model training, comprehensive student toolkits, master-level guidance, and certified career pathways.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-laposh-gold shrink-0" />
                  <span>Government Recognized Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-laposh-gold shrink-0" />
                  <span>Small Batches (Max 6 Students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-laposh-gold shrink-0" />
                  <span>Complete Student Tool Kit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-laposh-gold shrink-0" />
                  <span>100% Practical Model Sessions</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3.5">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase shadow-subtle transition-all"
                >
                  <span>Apply for Next Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/919812362083?text=${encodeURIComponent(
                    'Hello Khan Hair Xpenso Academy, I want to learn more about the Salon & Beauty Masterclass fees, batch timings, and certification.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Admission Counselor</span>
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                alt="Beauty and Salon Student Training in Kurukshetra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Curriculum Outline */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
              In-Depth Syllabus
            </span>
            <h2 className="font-serif text-3xl font-bold text-laposh-text mt-1">
              Curriculum & Skill Modules
            </h2>
            <p className="text-xs text-laposh-muted mt-2">
              Note: Exact fee structure, batch schedules, and customized syllabus are finalized upon consultation with our academy director.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumModules.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-laposh-border shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-laposh-gold">
                    {mod.module}
                  </span>
                  <h3 className="font-serif text-base font-bold text-laposh-text mt-1 mb-3">
                    {mod.title}
                  </h3>
                  <ul className="space-y-2 text-xs text-laposh-muted">
                    {mod.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-laposh-gold mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Enquiry Form */}
        <div id="enquiry-form" className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-laposh-gold">
                Admissions Enquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-laposh-text mt-1">
                Register Your Interest
              </h3>
              <p className="text-xs text-laposh-muted mt-2">
                Fill out the application below to receive syllabus details, batch schedule, and counseling support.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Application Received!
                </h4>
                <p className="text-xs text-emerald-700 mt-2 mb-6">
                  Thank you, <strong>{formData.studentName}</strong>. Our academy coordinator will connect with you via WhatsApp/call within 24 hours.
                </p>
                <a
                  href={`https://wa.me/919812362083?text=${encodeURIComponent(
                    `Hello Khan Hair Xpenso Academy, I just submitted an online inquiry for ${formData.courseInterest}. My name is ${formData.studentName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-laposh-text mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-laposh-text mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-laposh-text mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-laposh-text mb-1">
                      Your Skill Level
                    </label>
                    <select
                      value={formData.skillLevel}
                      onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                    >
                      <option value="Beginner">Beginner (No prior experience)</option>
                      <option value="Intermediate">Intermediate (Basic nail polish knowledge)</option>
                      <option value="Advanced">Advanced (Practicing beautician)</option>
                      <option value="Professional Refresher">Professional Refresher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-laposh-text mb-1">
                      Preferred Batch Timing
                    </label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                    >
                      <option value="Weekday Morning (10 AM - 1 PM)">Weekday Morning (10 AM - 1 PM)</option>
                      <option value="Weekday Afternoon (2 PM - 5 PM)">Weekday Afternoon (2 PM - 5 PM)</option>
                      <option value="Weekend Intensive">Weekend Intensive</option>
                      <option value="Flexible / Fast Track">Flexible / Fast Track</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-laposh-text mb-1">
                    Questions or Career Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you hope to achieve (e.g. start own studio in Kurukshetra, add nail extensions to salon menu)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white font-semibold tracking-wider uppercase text-xs shadow-subtle hover:shadow-luxury transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Academy Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;
