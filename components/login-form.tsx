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
import { startTransition, useActionState, useEffect, useState } from "react";
import {
  loginFormFunction,
  signInWithGoogleAction,
} from "@/funcs/login-form-function";
import { Spinner } from "./ui/spinner";
import { useT } from "@/lib/i18n/client";

interface LoginModel {
  nonce: string;
  hashedNonce: string;
}

const Login = ({ nonce, hashedNonce }: LoginModel) => {
  const [state, formAction, isPending] = useActionState(loginFormFunction, {
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useT();
  const [googleError, setGoogleError] = useState<string | null>(null);

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

  useEffect(() => {
    window.handleSignInWithGoogle = (
      response: google.accounts.id.CredentialResponse,
    ) => {
      signInWithGoogleAction(nonce, response)
        .then(({ error }) => {
          setGoogleError(error?.message ?? null);
        })
        .catch(() => {
          setGoogleError("An error occurred while signing in with Google");
        });
    };
  }, [nonce]);

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
              id="g_id_onload"
              data-client_id="749559163816-fnl78jvo7jvlgicdoqki4se514h1h2aa.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="handleSignInWithGoogle"
              data-nonce={hashedNonce}
              data-auto_select="true"
              data-itp_support="true"
            ></div>

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
