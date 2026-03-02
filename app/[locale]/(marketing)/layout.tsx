import { Footer1 } from "@/components/footer1";
import { Header1 } from "@/components/header";
import { getHeaderData } from "@/data/header";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata() {
  const { t } = await getT();

  return {
    title: t("home.title"),
  };
}

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeaderData();

  return (
    <>
      <Header1
        className="fixed top-0 z-50 w-full left-0 bg-background shadow-lg dark:shadow-gray-800/50"
        {...headerData}
      />
      {children}
      <Footer1 />
    </>
  );
}
