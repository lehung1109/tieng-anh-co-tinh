import { Login } from "@/components/login-form";
import { generateNonce } from "@/lib/utils";
import RecaptchaProvider from "@/providers/recaptcha-provider";

export default async function LoginPage() {
  const [nonce, hashedNonce] = await generateNonce();

  return (
    <main className="pt-20">
      <RecaptchaProvider>
        <Login nonce={nonce} hashedNonce={hashedNonce} />
      </RecaptchaProvider>
    </main>
  );
}
