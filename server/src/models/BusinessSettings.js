import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'Khan Hair Xpenso - The Beauty Salon & Training',
    },
    address: {
      type: String,
      default: 'SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118',
    },
    phone: {
      type: String,
      default: '+91 98123 62083',
    },
    whatsappNumber: {
      type: String,
      default: '919812362083',
    },
    openingHours: {
      start: { type: String, default: '10:00' },
      end: { type: String, default: '21:30' },
      days: { type: String, default: 'Monday – Sunday (10 AM – 9:30 PM)' },
    },
    instagramUrl: {
      type: String,
      default: 'https://www.instagram.com/khanhairxpenso_kkr/',
    },
    facebookUrl: {
      type: String,
      default: 'https://www.facebook.com/khanhairxpensothebeautysalon',
    },
    websiteUrl: {
      type: String,
      default: 'http://khanhairxpenso.com/',
    },
    googleRating: {
      rating: { type: Number, default: 3.9 },
      reviewCount: { type: Number, default: 301 },
      googleMapsReviewUrl: {
        type: String,
        default: 'https://maps.google.com/?q=Khan+Hair+Xpenso+Kurukshetra',
      },
    },
    bookingSettings: {
      slotIntervalMinutes: { type: Number, default: 30 },
      bufferMinutes: { type: Number, default: 15 },
      maxAdvanceDays: { type: Number, default: 30 },
      simultaneousStaffCount: { type: Number, default: 2 }, // Maximum parallel appointments salon can service
    },
    cancellationPolicyText: {
      type: String,
      default: 'Appointments can be cancelled or rescheduled at least 4 hours before your scheduled time slot. For late arrivals exceeding 15 minutes, the slot may be offered to waiting walk-in clients.',
    },
  },
  {
    timestamps: true,
  }
);

export const BusinessSettings = mongoose.model('BusinessSettings', businessSettingsSchema);
export default BusinessSettings;
