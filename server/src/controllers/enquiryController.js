import CourseEnquiry from '../models/CourseEnquiry.js';
import { jsonToCSV } from '../utils/csvHelper.js';
import { sendNotificationEmail } from '../config/mailer.js';
import { createCourseEnquirySchema, updateCourseEnquirySchema } from '../validators/courseEnquiryValidator.js';

export const createCourseEnquiry = async (req, res, next) => {
  try {
    const validatedData = createCourseEnquirySchema.parse(req.body);

    const enquiry = await CourseEnquiry.create({
      ...validatedData,
      status: 'New',
    });

    // Notify admin via email if configured
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER;
    if (adminEmail) {
      sendNotificationEmail({
        to: adminEmail,
        subject: `New Academy Course Enquiry - ${enquiry.studentName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #f0e5e8;">
            <h3 style="color: #c6a36b;">New Student Lead - La Posh Academy</h3>
            <p><strong>Student Name:</strong> ${enquiry.studentName}</p>
            <p><strong>Phone:</strong> ${enquiry.phone}</p>
            <p><strong>Email:</strong> ${enquiry.email || 'N/A'}</p>
            <p><strong>Course Interest:</strong> ${enquiry.courseInterest}</p>
            <p><strong>Skill Level:</strong> ${enquiry.skillLevel}</p>
            <p><strong>Preferred Batch:</strong> ${enquiry.preferredBatch}</p>
            <p><strong>Message:</strong> ${enquiry.message || 'No additional note'}</p>
          </div>
        `,
      }).catch((e) => console.warn('Admin enquiry notification warning:', e.message));
    }

    res.status(201).json({
      success: true,
      message: 'Course enquiry submitted successfully. Our academy counselor will contact you shortly.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseEnquiries = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20, export: exportType } = req.query;

    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ studentName: searchRegex }, { phone: searchRegex }, { email: searchRegex }];
    }

    if (exportType === 'csv') {
      const allMatching = await CourseEnquiry.find(query).sort({ createdAt: -1 });
      const fields = [
        { key: 'studentName', label: 'Student Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'courseInterest', label: 'Course Interest' },
        { key: 'skillLevel', label: 'Skill Level' },
        { key: 'preferredBatch', label: 'Preferred Batch' },
        { key: 'status', label: 'Status' },
        { key: 'message', label: 'Student Message' },
        { key: 'followUpNotes', label: 'Follow Up Notes' },
        { key: 'createdAt', label: 'Submitted At' },
      ];

      const csvData = jsonToCSV(allMatching, fields);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laposh-academy-enquiries-${Date.now()}.csv`);
      return res.send(csvData);
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [enquiries, total] = await Promise.all([
      CourseEnquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      CourseEnquiry.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: enquiries,
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

export const getCourseEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await CourseEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Course enquiry not found',
      });
    }
    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourseEnquiry = async (req, res, next) => {
  try {
    const { status, followUpNotes } = updateCourseEnquirySchema.parse(req.body);

    const enquiry = await CourseEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Course enquiry not found',
      });
    }

    if (status) enquiry.status = status;
    if (followUpNotes !== undefined) enquiry.followUpNotes = followUpNotes;

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Course enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseEnquiry = async (req, res, next) => {
  try {
    const enquiry = await CourseEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Course enquiry not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Course enquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
