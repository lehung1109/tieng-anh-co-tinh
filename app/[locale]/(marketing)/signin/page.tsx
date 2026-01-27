import { Login } from "@/components/login";
import RecaptchaProvider from "@/providers/RecaptchaProvider";

export default function LoginPage() {
  return (
    <main className="pt-20">
      <RecaptchaProvider>
        <Login />
      </RecaptchaProvider>
    </main>
  );
}
