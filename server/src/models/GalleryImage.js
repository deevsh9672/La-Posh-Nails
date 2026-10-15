import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'French Nails',
        'Chrome Nails',
        'Nude Nail Designs',
        'Bridal Nails',
        'Glitter Nails',
        'Floral Nail Art',
        'Festive Nail Designs',
        'Acrylic Extensions',
        'Makeup & Hairstyles',
      ],
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    cloudinaryPublicId: {
      type: String,
      default: '',
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for accessibility and SEO'],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
export default GalleryImage;
