import { Input } from "./ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";

const Register = () => {
  return (
    <div className="container max-w-xl">
      <h1 className="text-2xl font-bold mb-10">Đăng ký</h1>

      <form action="">
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
