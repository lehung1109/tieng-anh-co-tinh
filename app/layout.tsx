import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { languages } from "@/lib/i18n/settings";
import { generateNonce } from "@/lib/utils";
import OneTap from "@/components/onetap";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { Suspense } from "react";
import RecaptchaProvider from "@/providers/recaptcha-provider";
import { GoogleProvider } from "@/providers/google-provider";
import { SWProvider } from "@/providers/sw-provider";
import InstallPrompt from "@/components/install-prompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Tự tin nói tiếng Anh - Học 1-1 cùng giáo viên",
  description:
    "Học tiếng Anh giao tiếp 1-1 với lộ trình cá nhân hóa. Sửa phát âm ngay, luyện tình huống thực tế. Đặt lịch học thử miễn phí ngay!",
  keywords: [
    "học tiếng anh 1-1",
    "tiếng anh giao tiếp",
    "học tiếng anh online",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [nonce, hashedNonce] = await generateNonce();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecaptchaProvider>
          <GoogleProvider>
            <SupabaseProvider>
              <SWProvider>
                {children}
                <InstallPrompt />
              </SWProvider>

              <Suspense fallback={<div>Loading...</div>}>
                <OneTap nonce={nonce} hashedNonce={hashedNonce} />
              </Suspense>
            </SupabaseProvider>
          </GoogleProvider>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
