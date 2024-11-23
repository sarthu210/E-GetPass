import nodemailer from 'nodemailer';
import env from "dotenv";

env.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send emails
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
    });
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
}

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email template for OTP
function otpEmailTemplate(otp) {
  return `
    <html>
      <body>
        <h1>Your One-Time Password</h1>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      </body>
    </html>
  `;
}

// Email template for general notifications
function notificationEmailTemplate(message) {
  return `
    <html>
      <body>
        <h1>Notification</h1>
        <p>${message}</p>
      </body>
    </html>
  `;
}

// Function to send OTP email
async function sendOTPEmail(email) {
  const otp = generateOTP();
  const subject = 'Your OTP for Authentication';
  const html = otpEmailTemplate(otp);
  await sendEmail(email, subject, html);
  return otp;
}

// Function to send notification email
async function sendNotificationEmail(email, message) {
  const subject = 'Notification';
  const html = notificationEmailTemplate(message);
  await sendEmail(email, subject, html);
}


export { sendOTPEmail, sendNotificationEmail };
