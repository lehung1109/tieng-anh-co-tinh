import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import { languages } from "@/lib/i18n/settings";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script src="https://accounts.google.com/gsi/client" async></script>

        <div
          id="g_id_onload"
          data-client_id="749559163816-fnl78jvo7jvlgicdoqki4se514h1h2aa.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
          data-nonce=""
          data-auto_select="true"
          data-itp_support="true"
        ></div>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
