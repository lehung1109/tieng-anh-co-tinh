import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { languages } from "@/lib/i18n/settings";
import Script from "next/script";
import { QueryClientProviderWrapper } from "@/providers/query-client-provider";
import { generateNonce } from "@/lib/utils";
import OneTap from "@/components/onetap";

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
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        <OneTap nonce={nonce} hashedNonce={hashedNonce} />
      </body>
    </html>
  );
}
