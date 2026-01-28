"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { contactFormFunction } from "@/funcs/contact-form-function";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Form = () => {
  const [state, formAction, isPending] = useActionState(contactFormFunction, {
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
    <form onSubmit={handleSubmit} ref={formRef}>
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

          {state?.errors?.name && !isPending && (
            <FieldError>{state.errors.name[0]}</FieldError>
          )}
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

          {state?.errors?.phone && !isPending && (
            <FieldError>{state.errors.phone[0]}</FieldError>
          )}
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
  );
};

export { Form };
