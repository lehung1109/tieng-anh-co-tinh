"use client";

import { useActionState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { contactFormFunction } from "@/funcs/contact-form-function";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Form = () => {
  const [state, formAction, isPending] = useActionState(
    contactFormFunction,
    ""
  );

  return (
    <form action={formAction}>
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

      {state && !isPending && <p className="text-green-500 mt-2">{state}</p>}
    </form>
  );
};

export { Form };
