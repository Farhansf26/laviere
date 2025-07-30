"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LucideIcon, Ruler } from "lucide-react";
import { IconType } from "react-icons/lib";
import { AiFillProduct } from "react-icons/ai";
import { IoMdArrowDropright } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { HiOutlineShoppingBag } from "react-icons/hi";

interface IRoutes {
  label: string;
  href: string;
  active?: boolean | undefined;
  icon: LucideIcon | IconType;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const routes: IRoutes[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
      icon: VscGraph,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      active: pathname?.includes("/admin/categories"),
      icon: TbCategory2,
    },
    {
      label: "Ages",
      href: "/admin/ages",
      active: pathname?.includes("/admin/ages"),
      icon: Ruler,
    },
    {
      label: "Products",
      href: "/admin/products",
      active: pathname?.includes("/admin/products"),
      icon: AiFillProduct,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      active: pathname?.includes("/admin/orders"),
      icon: HiOutlineShoppingBag,
    },
  ];

  return (
    <div>
      <div className="flex flex-col pt-10 space-y-4">
        {routes.map((route) => {
          const Icon = route.icon;

          return (
            <div
              key={route.href}
              className="flex items-center space-x-2 relative"
            >
              {route.active && (
                <IoMdArrowDropright className="absolute -left-8" size={24} />
              )}
              <Button
                onClick={() => router.push(route.href)}
                className="w-[150px] py-5 group active:!bg-gray-200"
                variant={route.active ? "default" : "link"}
              >
                {route.label}
                <Icon className="ml-auto group-hover:rotate-[16deg] transition duration-150" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
