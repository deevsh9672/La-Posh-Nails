import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'La Posh Nails Studio & Makeup Hairstyles Academy',
    },
    address: {
      type: String,
      default: '102 Pride Corporate, Royal Park Main Road, Kalavad Road, Opposite Krishna Medical, Rajkot, Gujarat 360005',
    },
    phone: {
      type: String,
      default: '+91 95123 48787',
    },
    whatsappNumber: {
      type: String,
      default: '919512348787',
    },
    openingHours: {
      start: { type: String, default: '10:00' },
      end: { type: String, default: '20:00' },
      days: { type: String, default: 'Monday – Sunday (10 AM – 8 PM)' },
    },
    instagramUrl: {
      type: String,
      default: 'https://www.instagram.com/laposh_nails_and_salon/',
    },
    googleRating: {
      rating: { type: Number, default: 4.3 },
      reviewCount: { type: Number, default: 189 },
      googleMapsReviewUrl: {
        type: String,
        default: 'https://maps.google.com/?q=La+Posh+Nails+Studio+Rajkot',
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
