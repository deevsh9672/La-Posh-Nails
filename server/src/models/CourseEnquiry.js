import mongoose from 'mongoose';

const courseEnquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    courseInterest: {
      type: String,
      required: [true, 'Course interest is required'],
      default: 'Comprehensive Professional Nail Art Masterclass',
    },
    skillLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional Refresher'],
      default: 'Beginner',
    },
    preferredBatch: {
      type: String,
      enum: ['Weekday Morning (10 AM - 1 PM)', 'Weekday Afternoon (2 PM - 5 PM)', 'Weekend Intensive', 'Flexible / Fast Track'],
      default: 'Weekday Morning (10 AM - 1 PM)',
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Enrolled', 'Closed'],
      default: 'New',
      index: true,
    },
    followUpNotes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseEnquiry = mongoose.model('CourseEnquiry', courseEnquirySchema);
export default CourseEnquiry;
