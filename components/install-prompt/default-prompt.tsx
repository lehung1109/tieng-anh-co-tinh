"use client";

import { useT } from "@/lib/i18n/client";
import { Button } from "../ui/button";
import Image from "next/image";

const DefaultPrompt = ({
  triggerInstall,
}: {
  triggerInstall: () => Promise<void>;
}) => {
  const { t } = useT();

  return (
    <div className="flex flex-col gap-4 items-center justify-center fixed p-4 bg-gray-950 shadow-lg rounded-lg top-30 right-10 max-w-sm z-50 text-center">
      <div className="text-2xl font-bold flex items-center justify-center gap-4">
        <Image
          className="rounded-full w-10 h-10 object-cover"
          src="/icon-large.png"
          alt="logo"
          width={50}
          height={50}
        />
        Tiếng Anh Cô Tình
      </div>

      <p>{t("common.installPromptDescription")}</p>

      <Button onClick={triggerInstall}>Install</Button>
    </div>
  );
};

export default DefaultPrompt;
