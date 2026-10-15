import nodemailer from 'nodemailer';

const isEmailConfigured = () => {
  return (
    Boolean(process.env.EMAIL_USER) &&
    process.env.EMAIL_USER !== 'your_email@gmail.com' &&
    Boolean(process.env.EMAIL_PASSWORD) &&
    process.env.EMAIL_PASSWORD !== 'your_email_app_password'
  );
};

export const createTransporter = () => {
  if (!isEmailConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send an email notification safely without crashing the main application flow
 */
export const sendNotificationEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log(`[Email Notice] Email not sent (SMTP not configured). Subject: "${subject}" to: ${to}`);
      return { success: false, reason: 'SMTP credentials not configured' };
    }

    const fromAddress = process.env.EMAIL_FROM || '"La Posh Studio & Academy" <no-reply@laposh.com>';
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      text: text || '',
      html,
    });

    console.log(`[Email Sent] Message ID: ${info.messageId} to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Error] Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};
