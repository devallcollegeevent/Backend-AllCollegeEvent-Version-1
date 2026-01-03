const nodemailer = require("nodemailer");

// Interface for email payload
interface SendEmailProps {
  to: string;       // Recipient email address
  subject: string;  // Email subject
  html: string;     // HTML email body
  text?:String;
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
  text, //  accept text
}: SendEmailProps): Promise<void> => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.verify();

  await transporter.sendMail({
    from: process.env.FROM_EMAIL as string,
    to,
    subject,
    html,
    text, // ✅PASS TEXT
  });
};
