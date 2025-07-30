"use client";

import { useRouter } from "next/navigation";
import { IRoutes } from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiThMenu } from "react-icons/ti";
import { TbCategory2 } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { LucideIcon, Ruler } from "lucide-react";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IconType } from "react-icons/lib";

interface IRoutes {
  label: string;
  href: string;
  icon: LucideIcon | IconType;
}

export default function AdminNavbar() {
  const router = useRouter();

  const routes: IRoutes[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: VscGraph,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: TbCategory2,
    },
    {
      label: "Ages",
      href: "/admin/ages",
      icon: Ruler,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: AiFillProduct,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: HiOutlineShoppingBag,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:cursor-pointer hover:shadow-xl hover:opacity-90 transition"
      >
        <TiThMenu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-[180px] space-y-1">
        <DropdownMenuLabel>Admin Page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routes.map((route) => {
          const Icon = route.icon

          return (
            <DropdownMenuItem
              key={route.href}
              onSelect={() => router.push(route.href)}
            >
              {route.label} <Icon className="ml-auto"/>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
