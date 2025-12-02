import { sendEmail } from "./mailer";

export const sendOtpEmail = async (
  email: string,
  otp: string,
  expiryMinutes: number = 10
) => {
  const now = new Date();

  const formatTime = (date: Date) =>
    date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const html = `
    <h2>Password Reset OTP</h2>
    <p>Your OTP is:</p>
    <h1 style="letter-spacing: 4px; color: #2b6cb0;">${otp}</h1>

    <p style="margin-top: 20px;">
      This OTP will be valid for <b>${expiryMinutes} minutes</b>.
    </p>

    <p>If you did not request this, please ignore this email.</p>
  `;

  await sendEmail({
    to: email,
    subject: "Your Password Reset OTP",
    html,
  });
};
