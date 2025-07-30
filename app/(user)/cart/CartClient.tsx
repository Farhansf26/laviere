"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import ProductInCart from "./components/ProductInCart";
import Heading from "@/components/ui/heading";
import { useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";
import Summary from "./components/Summary";
import { User } from "@/lib/generated/prisma";

interface CartClientProps {
  currentUser?: User | null
}

export default function CartClient({ currentUser }: CartClientProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const { cart, removeFromCart, totalPrice } = useCartStore();
  const router = useRouter()

  const cartIds = cart.map((item) => item.id);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = (ids: string[]) => {
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected(ids);
    }
  };

  if (cart.length < 1) {
    return (
      <div className="flex items-center flex-col justify-center space-y-4 h-screen scale-110 w-fit mx-auto">
        <div className="flex items-start">
          <PiWarningCircleFill className="text-3xl" />
          <Heading
            title="Keranjang belanja masih kosong"
            description="Coba tambahkan produk yang ada inginkan ke dalam keranjang"
            center
          />
        </div>
        <Button
          onClick={() => router.push('/')}
        >
          <IoChevronBackCircle/>
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto 2xl:px-20 px-5 py-7 space-y-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-8 col-span-12">
          <div className="flex items-center justify-between gap-5">
            <Heading
              title="Keranjang Belanja"
              description="Produk produk yang anda tambahkan ke dalam keranjang"
            />
            <Button
              variant="outline"
              onClick={() => removeFromCart(selected)}
              className="max-md:text-xs flex items-center"
              disabled={selected.length < 1 ? true : false}
            >
              <FaTrash className="text-red-500" />
              <span className="max-md:hidden">{selected.length === cart.length ? 'Hapus Semua' : 'Hapus'}</span>
            </Button>
          </div>
          <div className="grid grid-cols-12 p-3 pt-6 items-center justify-items-center gap-3 
            font-bold max-lg:text-sm">
            <div className="col-span-6 flex items-center md:gap-7 gap-2 justify-self-start">
              <div
                onClick={() => handleSelectAll(cartIds)}
                className="text-lg max-md:text-base"
              >
                {selected.length === cart.length && selected.length > 0 ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )}
              </div>
              Produk
            </div>
            <div className="col-span-2">Harga</div>
            <div className="col-span-2">Kuantitas</div>
            <div className="col-span-2">Total</div>
          </div>
          <div className="flex flex-col max-h-[47vh] overflow-y-scroll">
            {cart.map((item) => (
              <ProductInCart
                key={item.id}
                product={item}
                selected={selected}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 col-span-12 justify-self-center max-lg:justify-self-end">
          <Summary
            totalPrice={totalPrice()}
            totalProduct={cart.length}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
