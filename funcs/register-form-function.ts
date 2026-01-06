"use server";

import { verifyRecaptcha } from "@/lib/utils";
import {
  RegisterFormData,
  registerFormSchema,
} from "@/lib/validations/register-form";
import nodemailer from "nodemailer";
import { flattenError } from "zod";

interface RegisterFormFunctionState {
  message: string;
  success?: boolean;
  errors?: ReturnType<typeof flattenError<RegisterFormData>>["fieldErrors"];
}

export const registerFormFunction = async (
  previousState: RegisterFormFunctionState,
  formData: FormData
): Promise<RegisterFormFunctionState> => {
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
  const email = formData.get("email") as string;
  const pass = formData.get("pass") as string;
  const confirmPass = formData.get("confirm-pass") as string;

  // validation form data
  const validationResult = registerFormSchema.safeParse({
    name,
    email,
    pass,
    confirmPass,
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
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Học viên đăng ký qua website",
      text: `Họ và tên: ${name}\nEmail: ${email}\nPassword: ${pass}`,
    });

    return {
      message: "Đăng ký thành công!",
      success: true,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message: "Có lỗi khi đăng ký. Vui lòng thử lại sau.",
      success: false,
    };
  }
};
