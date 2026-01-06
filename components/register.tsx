import { Input } from "./ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { registerFormFunction } from "@/funcs/register-form-function";

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

      <form onSubmit={handleSubmit} ref={formRef}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
            <Input type="text" name="name" id="name" />
            <FieldError>Họ và tên không được để trống</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input type="email" name="email" id="email" />
            <FieldError>Email không được để trống</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="pass">Password</FieldLabel>
            <Input type="password" name="pass" id="pass" />
            <FieldError>Password không được để trống</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-pass">Confirm Password</FieldLabel>
            <Input type="password" name="confirm-pass" id="confirm-pass" />
            <FieldError>Confirm Password không được để trống</FieldError>
          </Field>

          <Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export { Register };
