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
import { startTransition, useActionState, useEffect, useRef } from "react";
import { registerFormFunction } from "@/funcs/register-form-function";
import { Spinner } from "./ui/spinner";

const Register = () => {
  const [state, formAction, isPending] = useActionState(registerFormFunction, {
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && state?.success) {
      formRef.current.reset();
    }
  }, [state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    // Get form data
    const formData = new FormData(event.currentTarget);

    // Generate reCAPTCHA token
    const token = await executeRecaptcha("contact_form");

    // Add token to form data
    formData.append("captchaToken", token);

    // Trigger server action
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="container max-w-xl">
      <h1 className="text-2xl font-bold mb-10">Đăng ký</h1>

      <form onSubmit={handleSubmit} ref={formRef} className="relative p-5">
        {/* loading animation */}
        {isPending && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-sm ">
            <Spinner className="size-8" />
          </div>
        )}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
            <Input type="text" name="name" id="name" />

            {state?.errors?.name && !isPending && (
              <FieldError>{state.errors.name[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input type="email" name="email" id="email" />

            {state?.errors?.email && !isPending && (
              <FieldError>{state.errors.email[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="pass">Password</FieldLabel>
            <Input type="password" name="pass" id="pass" />
            <FieldDescription>
              Password must be at least 8 characters
            </FieldDescription>

            {state?.errors?.pass && !isPending && (
              <FieldError>{state.errors.pass[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-pass">Confirm Password</FieldLabel>
            <Input type="password" name="confirm-pass" id="confirm-pass" />

            {state?.errors?.confirmPass && !isPending && (
              <FieldError>{state.errors.confirmPass[0]}</FieldError>
            )}
          </Field>

          <Field>
            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export { Register };
