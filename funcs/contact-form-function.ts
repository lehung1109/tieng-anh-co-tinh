"use server";

import {
  ContactFormData,
  contactFormSchema,
} from "@/lib/validations/contact-form";
import nodemailer from "nodemailer";
import { flattenError } from "zod";

interface ContactFormFunctionState {
  message: string;
  success?: boolean;
  errors?: ReturnType<typeof flattenError<ContactFormData>>["fieldErrors"];
}

export const contactFormFunction = async (
  previousState: ContactFormFunctionState,
  formData: FormData
): Promise<ContactFormFunctionState> => {
  // Get reCAPTCHA token
  const captchaToken = formData.get("captchaToken") as string;

  if (!captchaToken) {
    return {
      message: "Không tìm thấy token reCAPTCHA. Vui lòng thử lại.",
      success: false,
    };
  }

  // Verify reCAPTCHA
  const captchaData = await verifyRecaptcha(captchaToken);

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      message: "Xác thực reCAPTCHA thất bại. Vui lòng thử lại.",
      success: false,
    };
  }

  // Get form data
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // validation form data
  const validationResult = contactFormSchema.safeParse({
    name,
    phone,
    message,
  });

  if (!validationResult.success) {
    const errors = flattenError(validationResult.error).fieldErrors;

    return {
      message: "Có lỗi khi gửi yêu cầu. Vui lòng kiểm tra lại thông tin.",
      success: false,
      errors,
    };
  }

  // Send email with nodemailer
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ["nguyenthitinh.111996@gmail.com", "hung0895@gmail.com"],
      subject: "Học viên gửi yêu cầu qua website",
      text: `Họ và tên: ${name}\nSố điện thoại: ${phone}\nMessage: ${message}`,
    });

    return {
      message: "Gửi yêu cầu thành công!",
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message: "Có lỗi khi gửi yêu cầu. Vui lòng thử lại sau.",
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
