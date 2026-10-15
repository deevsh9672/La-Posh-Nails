import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { settingsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsPage = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phone: '',
    whatsappNumber: '',
    instagramUrl: '',
    cancellationPolicyText: '',
    openingHours: {
      start: '10:00',
      end: '20:00',
      days: 'Monday – Sunday (10 AM – 8 PM)',
    },
    bookingSettings: {
      slotIntervalMinutes: 30,
      bufferMinutes: 15,
      maxAdvanceDays: 30,
      simultaneousStaffCount: 2,
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await settingsAPI.get();
        if (res.data?.success && res.data.data) {
          const d = res.data.data;
          setFormData({
            businessName: d.businessName || '',
            address: d.address || '',
            phone: d.phone || '',
            whatsappNumber: d.whatsappNumber || '',
            instagramUrl: d.instagramUrl || '',
            cancellationPolicyText: d.cancellationPolicyText || '',
            openingHours: {
              start: d.openingHours?.start || '10:00',
              end: d.openingHours?.end || '20:00',
              days: d.openingHours?.days || 'Monday – Sunday (10 AM – 8 PM)',
            },
            bookingSettings: {
              slotIntervalMinutes: d.bookingSettings?.slotIntervalMinutes || 30,
              bufferMinutes: d.bookingSettings?.bufferMinutes || 15,
              maxAdvanceDays: d.bookingSettings?.maxAdvanceDays || 30,
              simultaneousStaffCount: d.bookingSettings?.simultaneousStaffCount || 2,
            },
          });
        }
      } catch (err) {
        showToast('Failed to load settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await settingsAPI.update(formData);
      showToast('Studio settings saved successfully!', 'success');
    } catch (err) {
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-laposh-gold" />
        <p className="text-xs">Loading studio configurations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Business Settings</h1>
        <p className="text-xs text-gray-500 mt-1">
          Update verified business contact information, operating hours, capacity, and booking rules.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Contact & Location Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-gray-900">General Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Telephone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                WhatsApp Direct Number (digits with country code)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Physical Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
            />
          </div>
        </div>

        {/* Operating Hours & Capacity */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-gray-900">
            Operating Hours & Capacity Management
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Opening Time (24h)</label>
              <input
                type="time"
                required
                value={formData.openingHours.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    openingHours: { ...formData.openingHours, start: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Closing Time (24h)</label>
              <input
                type="time"
                required
                value={formData.openingHours.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    openingHours: { ...formData.openingHours, end: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Simultaneous Client Capacity
              </label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={formData.bookingSettings.simultaneousStaffCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bookingSettings: {
                      ...formData.bookingSettings,
                      simultaneousStaffCount: Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Slot Step Interval (Minutes)
              </label>
              <input
                type="number"
                min="15"
                max="120"
                step="15"
                required
                value={formData.bookingSettings.slotIntervalMinutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bookingSettings: {
                      ...formData.bookingSettings,
                      slotIntervalMinutes: Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Max Advance Booking (Days)
              </label>
              <input
                type="number"
                min="7"
                max="90"
                required
                value={formData.bookingSettings.maxAdvanceDays}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bookingSettings: {
                      ...formData.bookingSettings,
                      maxAdvanceDays: Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
              />
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-gray-900">
            Cancellation Policy Statement
          </h3>
          <textarea
            rows={3}
            value={formData.cancellationPolicyText}
            onChange={(e) => setFormData({ ...formData, cancellationPolicyText: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-laposh-gold/40"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white font-semibold text-xs shadow-xs"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
