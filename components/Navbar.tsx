"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import { IoCart } from "react-icons/io5";
import { User } from "@/lib/generated/prisma";
import { useCartStore } from "@/hooks/useCartStore";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { TbLogin2 } from "react-icons/tb";
import { useSignInModal } from "@/hooks/useSignInModal";
import AdminNavbar from "./admin/AdminNavbar";

interface NavbarProps {
  currentUser?: User | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCartStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  const signInModal = useSignInModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };
    setIsMounted(true);

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = isHome && !scrolled ? "bg-transparent " : "bg-white shadow";

  return (
    <div className="pb-15">
      <nav
        className={`fixed top-0 w-full flex items-center text-black justify-between z-50 
          transition-all duration-700 
        ${navBg} px-3 lg:px-8 h-[63px] gap-4
        ${
          !isMounted
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Logo />

        {!pathname?.includes("/admin") && (
          <div className="text-black">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center lg:gap-7 gap-2 text-black">
          {currentUser?.role !== "ADMIN" && (
            <div
              onClick={() => router.push("/cart")}
              className="cursor-pointer hover:opacity-80 relative"
            >
              <IoCart className="text-2xl" />
              <div
                className="absolute -top-[5px] -right-[6px] bg-light-brown h-4 w-4 
            rounded-full flex items-center font-semibold justify-center text-xs text-black"
              >
                {cart.length}
              </div>
            </div>
          )}
          <div className="lg:hidden">
            {pathname?.includes("/admin") && (
              <div className="text-black">
                <AdminNavbar />
              </div>
            )}
          </div>
          {currentUser ? (
            <div className="flex items-center">
              <UserMenu currentUser={currentUser} />
            </div>
          ) : (
            <Button
              size="sm"
              className="max-lg:text-xs"
              onClick={signInModal.onOpen}
            >
              <p className="max-md:hidden">Login</p> <TbLogin2 />
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
