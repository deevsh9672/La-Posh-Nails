import Appointment from '../models/Appointment.js';
import BusinessSettings from '../models/BusinessSettings.js';
import Service from '../models/Service.js';

/**
 * Convert "HH:mm" time string into total minutes from midnight
 */
export const timeToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
};

/**
 * Convert total minutes from midnight back to "HH:mm"
 */
export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/**
 * Generate unique booking reference: LP-YYYYMMDD-XXXX
 */
export const generateBookingReference = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LP-${year}${month}${day}-${randomChars}`;
};

/**
 * Check if two time intervals [startA, endA] and [startB, endB] overlap
 */
export const checkIntervalOverlap = (startA, endA, startB, endB) => {
  return Math.max(startA, startB) < Math.min(endA, endB);
};

/**
 * Get available slots for a given date and service
 * @param {string} dateStr - YYYY-MM-DD
 * @param {string} serviceId - Service ID
 */
export const calculateAvailableSlots = async (dateStr, serviceId) => {
  // 1. Get business settings
  let settings = await BusinessSettings.findOne();
  if (!settings) {
    settings = new BusinessSettings();
  }

  // 2. Get service duration
  let durationMinutes = 60;
  if (serviceId) {
    const service = await Service.findById(serviceId);
    if (service && service.durationMinutes) {
      durationMinutes = service.durationMinutes;
    }
  }

  const openingMinutes = timeToMinutes(settings.openingHours?.start || '10:00');
  const closingMinutes = timeToMinutes(settings.openingHours?.end || '20:00');
  const slotInterval = settings.bookingSettings?.slotIntervalMinutes || 30;
  const maxCapacity = settings.bookingSettings?.simultaneousStaffCount || 2;

  // 3. Find all existing active appointments on dateStr
  const activeAppointments = await Appointment.find({
    appointmentDate: dateStr,
    status: { $in: ['Pending', 'Confirmed', 'Rescheduled'] },
  });

  const slots = [];

  // 4. Generate prospective slots
  for (let startMin = openingMinutes; startMin + durationMinutes <= closingMinutes; startMin += slotInterval) {
    const endMin = startMin + durationMinutes;
    const startTimeStr = minutesToTime(startMin);
    const endTimeStr = minutesToTime(endMin);

    // Count overlapping active appointments
    const overlappingCount = activeAppointments.filter((app) => {
      const appStart = timeToMinutes(app.startTime);
      const appEnd = timeToMinutes(app.endTime);
      return checkIntervalOverlap(startMin, endMin, appStart, appEnd);
    }).length;

    const isAvailable = overlappingCount < maxCapacity;

    slots.push({
      startTime: startTimeStr,
      endTime: endTimeStr,
      available: isAvailable,
      remainingCapacity: Math.max(0, maxCapacity - overlappingCount),
    });
  }

  return {
    date: dateStr,
    durationMinutes,
    openingTime: settings.openingHours?.start || '10:00',
    closingTime: settings.openingHours?.end || '20:00',
    slots,
  };
};

/**
 * Atomic double-booking conflict verification
 */
export const verifySlotAvailability = async ({ appointmentDate, startTime, endTime, excludeAppointmentId = null }) => {
  let settings = await BusinessSettings.findOne();
  if (!settings) {
    settings = new BusinessSettings();
  }
  const maxCapacity = settings.bookingSettings?.simultaneousStaffCount || 2;

  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);

  const query = {
    appointmentDate,
    status: { $in: ['Pending', 'Confirmed', 'Rescheduled'] },
  };

  if (excludeAppointmentId) {
    query._id = { $ne: excludeAppointmentId };
  }

  const existing = await Appointment.find(query);

  const overlappingCount = existing.filter((app) => {
    const appStart = timeToMinutes(app.startTime);
    const appEnd = timeToMinutes(app.endTime);
    return checkIntervalOverlap(startMin, endMin, appStart, appEnd);
  }).length;

  return overlappingCount < maxCapacity;
};
