"use client";

import { Input } from "./ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Button } from "./ui/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { startTransition, useActionState, useState } from "react";
import { loginFormFunction } from "@/funcs/login-form-function";
import { Spinner } from "./ui/spinner";
import { useT } from "@/lib/i18n/client";
import { useGoogleContext } from "@/hooks/use-google-context";

const Login = () => {
  const [state, formAction, isPending] = useActionState(loginFormFunction, {
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useT();
  const { state: googleState } = useGoogleContext();
  const googleError = googleState.error;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    // Get form data
    const formData = new FormData(event.currentTarget);

    // Generate reCAPTCHA token
    const token = await executeRecaptcha("login_form");

    // Add token to form data
    formData.append("captchaToken", token);

    // Trigger server action
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="container max-w-xl">
      <h1 className="text-2xl font-bold mb-10 text-center">
        {t("login.title")}
      </h1>

      <form onSubmit={handleSubmit} className="relative p-5">
        {/* loading animation */}
        {isPending && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-sm ">
            <Spinner className="size-8" />
          </div>
        )}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">{t("login.email")}</FieldLabel>
            <Input type="email" name="email" id="email" />

            {state?.errors?.email && !isPending && (
              <FieldError>{state.errors.email[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="pass">{t("login.password")}</FieldLabel>
            <Input type="password" name="pass" id="pass" />
            <FieldDescription>
              {t("login.passwordDescription")}
            </FieldDescription>

            {state?.errors?.pass && !isPending && (
              <FieldError>{state.errors.pass[0]}</FieldError>
            )}
          </Field>

          <Field>
            <Button type="submit" className="w-full">
              {t("login.submitButton")}
            </Button>
          </Field>

          <Field>
            {/* show message when error */}
            {state?.message && !isPending && state.success === false && (
              <FieldDescription className="text-red-500">
                {state.message}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="outline"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
            ></div>
          </Field>

          <Field>
            {/* show message when error while signing in with Google */}
            {googleError && (
              <FieldDescription className="text-red-500">
                {googleError}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export { Login };
