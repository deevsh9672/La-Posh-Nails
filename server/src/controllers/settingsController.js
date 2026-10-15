import BusinessSettings from '../models/BusinessSettings.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = new BusinessSettings();
    }

    const {
      businessName,
      address,
      phone,
      whatsappNumber,
      openingHours,
      instagramUrl,
      googleRating,
      bookingSettings,
      cancellationPolicyText,
    } = req.body;

    if (businessName) settings.businessName = businessName;
    if (address) settings.address = address;
    if (phone) settings.phone = phone;
    if (whatsappNumber) settings.whatsappNumber = whatsappNumber;
    if (instagramUrl) settings.instagramUrl = instagramUrl;
    if (cancellationPolicyText) settings.cancellationPolicyText = cancellationPolicyText;

    if (openingHours) {
      settings.openingHours = {
        ...settings.openingHours,
        ...openingHours,
      };
    }

    if (googleRating) {
      settings.googleRating = {
        ...settings.googleRating,
        ...googleRating,
      };
    }

    if (bookingSettings) {
      settings.bookingSettings = {
        ...settings.bookingSettings,
        ...bookingSettings,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Business settings updated successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
