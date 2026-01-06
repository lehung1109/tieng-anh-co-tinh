import { Register } from "@/components/register";
import RecaptchaProvider from "@/providers/RecaptchaProvider";

export default function RegisterPage() {
  return (
    <main className="pt-20">
      <RecaptchaProvider>
        <Register />
      </RecaptchaProvider>
    </main>
  );
}
