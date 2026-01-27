import { Footer1 } from "@/components/footer1";
import { Header1 } from "@/components/header";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata() {
  const { t } = await getT();

  return {
    title: t('home.title'),
  }
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header1 className="fixed top-0 z-50 w-full left-0 bg-background shadow-lg dark:shadow-gray-800/50" />
      {children}
      <Footer1 />
    </>
  );
}
