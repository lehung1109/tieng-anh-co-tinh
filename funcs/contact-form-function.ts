"use server";

import nodemailer from "nodemailer";

interface ContactFormFunctionState {
  message: string;
  success?: boolean;
}

export const contactFormFunction = async (
  previousState: ContactFormFunctionState,
  formData: FormData
): Promise<ContactFormFunctionState> => {
  // Get reCAPTCHA token
  const captchaToken = formData.get("captchaToken") as string;

  if (!captchaToken) {
    return {
      message: "reCAPTCHA token not found",
      success: false,
    };
  }

  // Verify reCAPTCHA
  const captchaData = await verifyRecaptcha(captchaToken);

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      message: "reCAPTCHA verification failed. Please try again.",
      success: false,
    };
  }

  // Get form data
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Send email with nodemailer
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ["nguyenthitinh.111996@gmail.com", "hung0895@gmail.com"],
      subject: "Học viên gửi yêu cầu qua website",
      text: `Họ và tên: ${name}\nSố điện thoại: ${phone}\Message: ${message}`,
    });

    return {
      message: "Email sent successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message: "Failed to send email",
      success: false,
    };
  }
};

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, { method: "POST" });
  const data = await response.json();

  return data;
};
