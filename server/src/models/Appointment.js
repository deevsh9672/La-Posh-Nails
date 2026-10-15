import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service is required'],
      index: true,
    },
    appointmentDate: {
      type: String, // Stored as ISO YYYY-MM-DD
      required: [true, 'Appointment date is required'],
      index: true,
    },
    startTime: {
      type: String, // Format HH:mm (e.g. "10:30")
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String, // Format HH:mm (e.g. "11:30")
      required: [true, 'End time is required'],
    },
    bookingType: {
      type: String,
      enum: ['salon', 'home'],
      default: 'salon',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled', 'No-show'],
      default: 'Pending',
      index: true,
    },
    customerNotes: {
      type: String,
      default: '',
      trim: true,
    },
    adminNotes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for slot conflict lookup
appointmentSchema.index({ appointmentDate: 1, startTime: 1, status: 1 });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
