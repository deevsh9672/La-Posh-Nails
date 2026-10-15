import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import CourseEnquiry from '../models/CourseEnquiry.js';
import {
  calculateAvailableSlots,
  verifySlotAvailability,
  generateBookingReference,
  timeToMinutes,
  minutesToTime,
} from '../services/availabilityService.js';
import { sendNotificationEmail } from '../config/mailer.js';
import { jsonToCSV } from '../utils/csvHelper.js';
import { createAppointmentSchema, updateAppointmentStatusSchema } from '../validators/appointmentValidator.js';

export const getAvailability = async (req, res, next) => {
  try {
    const { date, serviceId } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "date" (YYYY-MM-DD) is required',
      });
    }

    const availability = await calculateAvailableSlots(date, serviceId);
    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    const validatedData = createAppointmentSchema.parse(req.body);

    const service = await Service.findById(validatedData.serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Selected service is currently unavailable or was not found',
      });
    }

    const duration = service.durationMinutes || 60;
    const startMin = timeToMinutes(validatedData.startTime);
    const endMin = startMin + duration;
    const endTime = minutesToTime(endMin);

    // Double-booking conflict check
    const isSlotAvailable = await verifySlotAvailability({
      appointmentDate: validatedData.appointmentDate,
      startTime: validatedData.startTime,
      endTime,
    });

    if (!isSlotAvailable) {
      return res.status(409).json({
        success: false,
        message: 'The selected time slot is no longer available. Please select another slot.',
      });
    }

    const bookingReference = generateBookingReference();

    const appointment = await Appointment.create({
      bookingReference,
      customerName: validatedData.customerName,
      phone: validatedData.phone,
      email: validatedData.email || '',
      serviceId: service._id,
      appointmentDate: validatedData.appointmentDate,
      startTime: validatedData.startTime,
      endTime,
      bookingType: validatedData.bookingType,
      status: 'Pending',
      customerNotes: validatedData.customerNotes || '',
    });

    await appointment.populate('serviceId', 'name category price durationMinutes');

    // Trigger async email notification if email provided
    if (appointment.email) {
      sendNotificationEmail({
        to: appointment.email,
        subject: `Appointment Booking Request Received - ${bookingReference}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0e5e8; border-radius: 8px;">
            <h2 style="color: #c6a36b; margin-top: 0;">La Posh Nails Studio & Academy</h2>
            <p>Dear <strong>${appointment.customerName}</strong>,</p>
            <p>Thank you for choosing La Posh! We have received your appointment request.</p>
            <div style="background-color: #fff8f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Booking Reference:</strong> ${bookingReference}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${service.name}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${appointment.appointmentDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${appointment.startTime} - ${appointment.endTime}</p>
              <p style="margin: 5px 0;"><strong>Type:</strong> ${appointment.bookingType === 'salon' ? 'Studio Visit' : 'Home Service'}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #d97706; font-weight: bold;">Pending Confirmation</span></p>
            </div>
            <p>Our salon team in Kurukshetra will confirm your slot shortly via WhatsApp or call.</p>
            <p>Location: SCO-55, 56, Kessal Mall, Sector 17, Kurukshetra, Haryana 136118.</p>
            <p>Contact: +91 98123 62083</p>
          </div>
        `,
      }).catch((err) => console.warn('Customer email notice error:', err.message));
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booking request received successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { search, date, status, serviceId, page = 1, limit = 20, export: exportType } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (date) {
      query.appointmentDate = date;
    }

    if (serviceId) {
      query.serviceId = serviceId;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { customerName: searchRegex },
        { phone: searchRegex },
        { bookingReference: searchRegex },
      ];
    }

    // Export to CSV if requested
    if (exportType === 'csv') {
      const allMatching = await Appointment.find(query)
        .populate('serviceId', 'name category price')
        .sort({ appointmentDate: -1, startTime: -1 });

      const fields = [
        { key: 'bookingReference', label: 'Reference' },
        { key: 'customerName', label: 'Customer Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'service', label: 'Service', getter: (i) => i.serviceId?.name || 'N/A' },
        { key: 'appointmentDate', label: 'Date' },
        { key: 'startTime', label: 'Start Time' },
        { key: 'endTime', label: 'End Time' },
        { key: 'bookingType', label: 'Type' },
        { key: 'status', label: 'Status' },
        { key: 'customerNotes', label: 'Customer Notes' },
        { key: 'adminNotes', label: 'Admin Notes' },
        { key: 'createdAt', label: 'Created At' },
      ];

      const csvData = jsonToCSV(allMatching, fields);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laposh-appointments-${Date.now()}.csv`);
      return res.send(csvData);
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .populate('serviceId', 'name category price durationMinutes imageUrl')
        .sort({ appointmentDate: -1, startTime: -1 })
        .skip(skip)
        .limit(limitNum),
      Appointment.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('serviceId');
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }
    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = updateAppointmentStatusSchema.parse(req.body);

    const appointment = await Appointment.findById(req.params.id).populate('serviceId');
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    appointment.status = status;
    if (adminNotes !== undefined) {
      appointment.adminNotes = adminNotes;
    }

    await appointment.save();

    // Send status update notification email if email provided
    if (appointment.email) {
      sendNotificationEmail({
        to: appointment.email,
        subject: `Appointment Update: ${status} - ${appointment.bookingReference}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0e5e8; border-radius: 8px;">
            <h2 style="color: #c6a36b; margin-top: 0;">La Posh Nails Studio & Academy</h2>
            <p>Dear <strong>${appointment.customerName}</strong>,</p>
            <p>Your appointment status has been updated to: <strong>${status}</strong>.</p>
            <div style="background-color: #fff8f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Reference:</strong> ${appointment.bookingReference}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${appointment.serviceId?.name || 'Nail Service'}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${appointment.appointmentDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${appointment.startTime} - ${appointment.endTime}</p>
              ${appointment.adminNotes ? `<p style="margin: 5px 0;"><strong>Note:</strong> ${appointment.adminNotes}</p>` : ''}
            </div>
            <p>For any queries, please call us at +91 98123 62083.</p>
          </div>
        `,
      }).catch((e) => console.warn('Status email error:', e.message));
    }

    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardMetrics = async (req, res, next) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const [
      totalAppointments,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      todayAppointments,
      totalEnquiries,
      newEnquiries,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'Pending' }),
      Appointment.countDocuments({ status: 'Confirmed' }),
      Appointment.countDocuments({ status: 'Completed' }),
      Appointment.countDocuments({ status: 'Cancelled' }),
      Appointment.find({ appointmentDate: todayStr })
        .populate('serviceId', 'name category')
        .sort({ startTime: 1 }),
      CourseEnquiry.countDocuments(),
      CourseEnquiry.countDocuments({ status: 'New' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalAppointments,
        pendingCount,
        confirmedCount,
        completedCount,
        cancelledCount,
        todayCount: todayAppointments.length,
        todayAppointments,
        totalEnquiries,
        newEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};
