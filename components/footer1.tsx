import React from "react";
import { SiFacebook, SiZalo } from "@icons-pack/react-simple-icons";

import Image from "next/image";

interface Footer1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    width?: number;
    height?: number;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Liên hệ",
    links: [
      {
        name: "Email: nguyenthitinh.111996@gmail.com",
        href: "mailto:nguyenthitinh.111996@gmail.com",
      },
      { name: "SĐT: 0337659820", href: "tel:0337659820" },
      { name: "Hà Nội, Việt Nam", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <SiFacebook className="size-6" />,
    href: "https://m.me/tinh.nguyen.38887",
    label: "Facebook",
  },
  {
    icon: <SiZalo className="size-6" />,
    href: "https://zalo.me/0337659818",
    label: "Zalo",
  },
];

const Footer1 = ({
  logo = {
    url: "/",
    src: "/images/logo.png",
    alt: "logo",
    title: "logo",
    width: 223,
    height: 69,
  },
  sections = defaultSections,
  description = "Chúng tôi tin rằng mỗi người đều có thể tự tin giao tiếp tiếng Anh khi được học đúng cách, đúng lộ trình và có người đồng hành tận tâm",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 English Master. All rights reserved.",
  legalLinks = [],
  className,
}: Footer1Props) => {
  return (
    <section className={className}>
      <div className="container my-0">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  width={logo.width}
                  height={logo.height}
                  className="w-50 h-auto"
                />
              </a>
            </div>
            <p className="lg:max-w-[70%] text-sm">{description}</p>
            <ul className="flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer1 };
