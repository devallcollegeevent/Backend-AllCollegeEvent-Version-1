const nodemailer = require("nodemailer");

// Interface for email payload
interface SendEmailProps {
  to: string;       // Recipient email address
  subject: string;  // Email subject
  html: string;     // HTML email body
}

/**
 * Send an email using Gmail SMTP
 * - Uses Nodemailer
 * - Credentials are read from environment variables
 */
export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailProps): Promise<void> => {

  // Create SMTP transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",

    // SMTP authentication
    auth: {
      user: process.env.SMTP_USER as string, // Gmail address
      pass: process.env.SMTP_PASS as string, // App password
    },

    // TLS configuration (allows Gmail certificates)
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Verify SMTP connection before sending mail
  await transporter.verify();

  // Send email
  await transporter.sendMail({
    from: process.env.FROM_EMAIL as string, // Sender email
    to,                                     // Receiver email
    subject,                                // Email subject
    html,                                   // Email content (HTML)
  });
};
