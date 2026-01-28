import { Register } from "@/components/register-form";
import RecaptchaProvider from "@/providers/recaptcha-provider";

export default function RegisterPage() {
  return (
    <main className="pt-20">
      <RecaptchaProvider>
        <Register />
      </RecaptchaProvider>
    </main>
  );
}
