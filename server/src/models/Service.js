import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
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
      ],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      default: null, // As specified: Never invent prices; null if unverified/consultation
    },
    durationMinutes: {
      type: Number,
      required: true,
      default: 60,
      min: 15,
      max: 360,
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model('Service', serviceSchema);
export default Service;
