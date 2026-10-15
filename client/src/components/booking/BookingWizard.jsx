import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  User,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { servicesAPI, appointmentsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const BookingWizard = () => {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service');
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Form selections
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || '');
  const [selectedDate, setSelectedDate] = useState(() => {
    // Tomorrow by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bookingType, setBookingType] = useState('salon');
  const [customerNotes, setCustomerNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Load services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const res = await servicesAPI.getAll({ activeOnly: 'true' });
        if (res.data?.success) {
          setServices(res.data.data);
          if (preselectedServiceId && res.data.data.some((s) => s._id === preselectedServiceId)) {
            setSelectedServiceId(preselectedServiceId);
          } else if (res.data.data.length > 0 && !selectedServiceId) {
            setSelectedServiceId(res.data.data[0]._id);
          }
        }
      } catch (err) {
        showToast('Failed to load services. Please refresh.', 'error');
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, [preselectedServiceId]);

  // 2. Fetch real availability slots whenever date or service changes
  useEffect(() => {
    if (!selectedDate || !selectedServiceId) return;

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        setSelectedSlot(null);
        setErrorMessage('');
        const res = await appointmentsAPI.getAvailability(selectedDate, selectedServiceId);
        if (res.data?.success) {
          setAvailableSlots(res.data.data.slots || []);
        }
      } catch (err) {
        setAvailableSlots([]);
        setErrorMessage('Unable to calculate real-time slot availability. Please try another date.');
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedServiceId]);

  const selectedService = services.find((s) => s._id === selectedServiceId);

  // Min date: Today
  const todayStr = new Date().toISOString().split('T')[0];
  // Max date: 30 days from today
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!privacyConsent) {
      showToast('Please accept the privacy consent to proceed.', 'error');
      return;
    }

    if (!selectedSlot) {
      showToast('Please select an available appointment time slot.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');

      const payload = {
        customerName,
        phone,
        email: email || undefined,
        serviceId: selectedServiceId,
        appointmentDate: selectedDate,
        startTime: selectedSlot.startTime,
        bookingType,
        customerNotes,
      };

      const res = await appointmentsAPI.create(payload);
      if (res.data?.success) {
        setBookingResult(res.data.data);
        showToast('Appointment request submitted successfully!', 'success');
        setStep(4); // Confirmation step
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorMessage('This time slot was just reserved by another client! Please choose another slot.');
        showToast('Slot conflict. Please choose a different slot.', 'error');
        // Refresh slots
        const res = await appointmentsAPI.getAvailability(selectedDate, selectedServiceId);
        if (res.data?.success) {
          setAvailableSlots(res.data.data.slots || []);
        }
        setStep(2); // Go back to slot selection
      } else {
        const msg = err.response?.data?.message || 'Failed to submit appointment. Please check your inputs.';
        setErrorMessage(msg);
        showToast(msg, 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // STEP 4: Confirmation Screen
  if (step === 4 && bookingResult) {
    const waText = encodeURIComponent(
      `Hello La Posh Studio, I have booked an appointment online! Reference: ${bookingResult.bookingReference} for ${bookingResult.customerName} on ${bookingResult.appointmentDate} at ${bookingResult.startTime}. Please confirm.`
    );
    const waUrl = `https://wa.me/919512348787?text=${waText}`;

    return (
      <div className="bg-white rounded-3xl border border-laposh-border p-8 sm:p-12 shadow-luxury max-w-2xl mx-auto text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 mb-3">
          Status: Pending Confirmation
        </span>

        <h2 className="font-serif text-3xl font-bold text-laposh-text mb-2">
          Appointment Request Received!
        </h2>
        <p className="text-xs text-laposh-muted mb-6">
          Thank you, <strong className="text-laposh-text">{bookingResult.customerName}</strong>. Your request is safely recorded in our system. Our team will verify and confirm your slot shortly.
        </p>

        {/* Booking Card Details */}
        <div className="bg-laposh-warm rounded-2xl p-6 border border-laposh-border text-left space-y-3 mb-8">
          <div className="flex justify-between items-center pb-3 border-b border-laposh-border">
            <span className="text-xs font-medium text-laposh-muted">Booking Reference:</span>
            <span className="text-sm font-mono font-bold text-laposh-gold">
              {bookingResult.bookingReference}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-laposh-muted">Service:</span>
            <span className="font-semibold text-laposh-text">{selectedService?.name || 'Selected Service'}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-laposh-muted">Date & Time:</span>
            <span className="font-semibold text-laposh-text">
              {bookingResult.appointmentDate} at {bookingResult.startTime} - {bookingResult.endTime}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-laposh-muted">Location / Type:</span>
            <span className="font-semibold text-laposh-text">
              {bookingResult.bookingType === 'salon' ? 'Studio Visit (Kalavad Road, Rajkot)' : 'Home Service'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-laposh-muted">Contact Phone:</span>
            <span className="font-semibold text-laposh-text">{bookingResult.phone}</span>
          </div>
        </div>

        {/* WhatsApp Fast Confirmation CTA */}
        <div className="space-y-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Confirm Faster via WhatsApp</span>
          </a>

          <Link
            to="/"
            className="inline-block text-xs font-semibold text-laposh-gold hover:underline pt-2"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-laposh-border shadow-luxury overflow-hidden max-w-4xl mx-auto">
      {/* Step Indicator Header */}
      <div className="bg-laposh-warm border-b border-laposh-border p-6 sm:p-8">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[
            { num: 1, title: 'Service' },
            { num: 2, title: 'Date & Slot' },
            { num: 3, title: 'Your Details' },
          ].map((s) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s.num
                    ? 'bg-laposh-gold text-white shadow-sm'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-laposh-muted border border-laposh-border'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`ml-2 text-xs font-semibold hidden sm:inline ${
                  step === s.num ? 'text-laposh-text' : 'text-laposh-muted'
                }`}
              >
                {s.title}
              </span>
              {s.num < 3 && <div className="w-8 sm:w-16 h-0.5 bg-laposh-border mx-2 sm:mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="mx-6 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-bold text-laposh-text">Choose Your Service</h3>
            <p className="text-xs text-laposh-muted mt-1">
              Select the beauty treatment or nail art style you would like to book.
            </p>
          </div>

          {loadingServices ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2 text-laposh-muted">
              <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
              <p className="text-xs">Loading authentic services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto p-1">
              {services.map((srv) => {
                const isSelected = selectedServiceId === srv._id;
                return (
                  <div
                    key={srv._id}
                    onClick={() => setSelectedServiceId(srv._id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-laposh-gold bg-laposh-blush/30 shadow-subtle ring-2 ring-laposh-gold/30'
                        : 'border-laposh-border hover:border-laposh-gold/60 bg-white'
                    }`}
                  >
                    <div>
                      <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-laposh-warm">
                        <img
                          src={srv.imageUrl}
                          alt={srv.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-laposh-gold uppercase tracking-wider">
                        {srv.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-laposh-text mt-1">{srv.name}</h4>
                      <p className="text-[11px] text-laposh-muted mt-1 line-clamp-2">{srv.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-laposh-border/60 text-xs">
                      <span className="flex items-center gap-1 text-laposh-muted">
                        <Clock className="w-3 h-3 text-laposh-gold" /> {srv.durationMinutes || 60}m
                      </span>
                      <span className="font-semibold text-laposh-text">
                        {srv.price ? `₹${srv.price}` : 'Consultation'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-laposh-border">
            <button
              onClick={() => {
                if (!selectedServiceId) {
                  showToast('Please pick a service to continue', 'error');
                  return;
                }
                setStep(2);
              }}
              disabled={!selectedServiceId}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase disabled:opacity-50 transition-all"
            >
              <span>Next: Pick Date & Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Pick Date & Slot */}
      {step === 2 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-bold text-laposh-text">Select Date & Time</h3>
            <p className="text-xs text-laposh-muted mt-1">
              Real-time availability calculated between 10:00 AM and 8:00 PM for{' '}
              <strong className="text-laposh-text">{selectedService?.name}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-laposh-text">
                Appointment Date
              </label>
              <input
                type="date"
                min={todayStr}
                max={maxDateStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-laposh-text text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
              <p className="text-[11px] text-laposh-muted">
                Studio open 7 days a week: 10:00 AM – 8:00 PM.
              </p>
            </div>

            {/* Slot Picker */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-laposh-text">
                Available Time Slots ({selectedDate})
              </label>

              {loadingSlots ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-laposh-muted">
                  <Loader2 className="w-6 h-6 animate-spin text-laposh-gold" />
                  <p className="text-xs">Checking real-time slot availability...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-6 text-center text-xs text-laposh-muted border border-dashed rounded-xl">
                  No slots available on this date. Please pick another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto p-1">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot?.startTime === slot.startTime;
                    return (
                      <button
                        key={slot.startTime}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          !slot.available
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-laposh-gold text-white border-laposh-gold shadow-xs'
                            : 'bg-white hover:bg-laposh-warm border-laposh-border text-laposh-text'
                        }`}
                      >
                        <div>{slot.startTime}</div>
                        <div className="text-[10px] opacity-75">
                          {slot.available ? `${slot.remainingCapacity} left` : 'Booked'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-laposh-border">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-laposh-border text-xs font-semibold text-laposh-text hover:bg-laposh-warm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (!selectedSlot) {
                  showToast('Please select a time slot to proceed', 'error');
                  return;
                }
                setStep(3);
              }}
              disabled={!selectedSlot}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase disabled:opacity-50 transition-all"
            >
              <span>Next: Customer Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Customer Information & Consent */}
      {step === 3 && (
        <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-bold text-laposh-text">Confirm Your Details</h3>
            <p className="text-xs text-laposh-muted mt-1">
              Selected:{' '}
              <strong className="text-laposh-text">
                {selectedService?.name} on {selectedDate} at {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-laposh-text mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-laposh-gold absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dipti Vora"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-laposh-text mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-laposh-gold absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-laposh-text mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-laposh-gold absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="For email confirmation receipt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-laposh-text mb-1">
                Appointment Type
              </label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              >
                <option value="salon">Salon Visit (102 Pride Corporate, Kalavad Rd)</option>
                <option value="home">Home Service (Bridal / Group Makeup only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-laposh-text mb-1">
              Special Requirements or Nail Design Preferences (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Chrome finish, French tips, nail extension repair, or specific bridal reference..."
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full p-4 rounded-xl border border-laposh-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
            />
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-laposh-warm border border-laposh-border">
            <input
              type="checkbox"
              id="consent"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded text-laposh-gold focus:ring-laposh-gold border-laposh-border"
            />
            <label htmlFor="consent" className="text-xs text-laposh-muted leading-relaxed">
              I agree to the{' '}
              <Link to="/privacy-policy" className="text-laposh-gold underline">
                Privacy Policy
              </Link>{' '}
              and understand that this appointment will be confirmed by La Posh Nails Studio via WhatsApp or phone call.
            </label>
          </div>

          <div className="flex justify-between pt-6 border-t border-laposh-border">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-laposh-border text-xs font-semibold text-laposh-text hover:bg-laposh-warm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={submitting || !privacyConsent}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wider uppercase disabled:opacity-50 transition-all shadow-subtle hover:shadow-luxury"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingWizard;
