"use server";

import { getT } from "@/lib/i18n/server";
import { verifyRecaptcha } from "@/lib/utils";
import {
  LoginFormData,
  loginFormSchema,
} from "@/lib/validations/login-form";
import { loginUser } from "@/services/login-user";
import { flattenError } from "zod";

interface RegisterFormFunctionState {
  message: string;
  success?: boolean;
  errors?: ReturnType<typeof flattenError<LoginFormData>>["fieldErrors"];
}

export const loginFormFunction = async (
  previousState: RegisterFormFunctionState,
  formData: FormData
): Promise<RegisterFormFunctionState> => {
  const { t } = await getT();

  // Get reCAPTCHA token
  const captchaToken = formData.get("captchaToken") as string;

  if (!captchaToken) {
    return {
      message: t("common.recaptchaNotFound"),
      success: false,
    };
  }

  // Verify reCAPTCHA
  const captchaData = await verifyRecaptcha(captchaToken);

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      message: t("common.recaptchaFailed"),
      success: false,
    };
  }

  // Get form data
  const email = formData.get("email") as string;
  const pass = formData.get("pass") as string;

  // validation form data
  const validationResult = loginFormSchema.safeParse({
    email,
    pass,
  });

  if (!validationResult.success) {
    const errors = flattenError(validationResult.error).fieldErrors;

    return {
      message: t("common.formValidationFailed"),
      success: false,
      errors,
    };
  }

  // login user with supabase
  const { error } = await loginUser(email, pass);

  if (error) {
    return {
      message: t("common.loginFailed"),
      success: false,
    };
  }

  return {
    message: t("common.loginSuccess"),
    success: true,
  };
};
