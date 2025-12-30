"use client";

import { useActionState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { contactFormFunction } from "@/funcs/contact-form-function";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RecaptchaProvider from "@/providers/RecaptchaProvider";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Form = () => {
  const [state, formAction, isPending] = useActionState(contactFormFunction, {
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    // Generate reCAPTCHA token
    const token = await executeRecaptcha("contact_form");

    // Add token to form data
    const formData = new FormData(event.currentTarget);
    formData.append("captchaToken", token);

    // Trigger server action
    formAction(formData);
  };

  return (
    <RecaptchaProvider>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
            <Input
              type="text"
              placeholder="Họ và tên"
              id="name"
              required
              name="name"
              disabled={isPending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
            <Input
              type="tel"
              placeholder="Số điện thoại"
              id="phone"
              required
              name="phone"
              disabled={isPending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              placeholder="Message"
              id="message"
              required
              name="message"
              disabled={isPending}
            />
          </Field>
          <Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Đang gửi..." : "Gửi"}
            </Button>
          </Field>
        </FieldGroup>

        {state?.message && !isPending && (
          <p
            className={`mt-2 ${
              state.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </RecaptchaProvider>
  );
};

export { Form };
