"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import Logo from "./Logo";
import { IconType } from "react-icons/lib";

const SOCIAL_ICONS = [
  { icon: FaWhatsapp, name: "Whatsapp" },
  { icon: FaInstagram, name: "Instagram" },
  { icon: FaFacebook, name: "Facebook" },
];

const SocialIcon = ({ icon: Icon }: { icon: IconType }) => (
  <div className="cursor-pointer hover:underline hover:scale-102 transition hover:text-black text-xl">
    <Icon />
  </div>
);

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.includes("/admin")) return null;

  return (
    <div className="pt-4 pb-2 border-t border-gray-200">
      <div className="flex flex-col items-center text-center max-w-[700px] max-md:w-[80%] mx-auto pb-4">
        <Logo />
        <p className="text-sm max-md:text-xs mt-1 mb-3">
          Laviere adalah platform e-commerce yang menyediakan peralatan mandi
          untuk seluruh anggota keluarga{" "}
          <span className="max-md:hidden">
            dari anak-anak hingga orang dewasa. Kebersihan adalah awal dari
            kesehatan dan kenyamanan.
          </span>
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL_ICONS.map((icon) => (
            <SocialIcon key={icon.name} icon={icon.icon} />
          ))}
        </div>
      </div>
      <div className="px-4 flex items-center justify-between">
        <p className="text-xs md:text-sm font-light text-gray-600">
          &copy; {year} Laviere. All rights reserved.
        </p>
        <p className="text-xs md:text-sm font-light text-gray-600">
          Privacy Policy
        </p>
      </div>
    </div>
  );
}
