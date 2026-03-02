import { getT } from "@/lib/i18n/server";

export const getHeaderData = async () => {
  const { t } = await getT();

  return {
    logo: {
      url: "/",
      src: "/images/logo.png",
      alt: "logo",
      title: "logo",
      width: 223,
      height: 69,
    },
    menu: [
      { title: t("header.home"), url: "#hero" },
      { title: t("header.advantage"), url: "#advantage" },
      { title: t("header.roadmap"), url: "#roadmap" },
      { title: t("header.feedback"), url: "#feedback" },
      { title: t("header.contact"), url: "#contact" },
    ],
    auth: {
      signup: { title: t("header.signup"), url: "/signup" },
      login: { title: t("header.login"), url: "/login" },
    },
  };
};
