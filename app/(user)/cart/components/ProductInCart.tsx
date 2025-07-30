"use client";

import { CartItem, useCartStore } from "@/hooks/useCartStore";
import { indoCurrency } from "@/lib/formatNumber";
import Image from "next/image";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import toast from "react-hot-toast";

interface ProductInCartProps {
  product: CartItem;
  selected: string[];
  onSelect: (id: string) => void;
}

export default function ProductInCart({
  product,
  selected,
  onSelect,
}: ProductInCartProps) {
  const { updateQuantity, removeFromCart } = useCartStore()

  const handleAddQuantity = () => {
    if(product.quantity === product.stock) {
      return toast.error(`Produk hanya tersisa ${product.stock} buah`)
    } else {
      updateQuantity(product.id, product.quantity + 1)
    }
  }

  const handleReduceQuantity = () => {
    if(product.quantity === 1) {
      removeFromCart([product.id])
    } else {
      updateQuantity(product.id, product.quantity - 1)
    }
  }

  return (
    <div className="grid grid-cols-12 border-t border-black p-3 items-center justify-items-center gap-3">
      <div className="col-span-6 flex items-center gap-2 justify-self-start">
        <div
          onClick={() => onSelect(product.id)}
          className="text-xl max-md:text-lg"
        >
          {selected.includes(product.id) ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </div>
        <div className="relative lg:w-[100px] lg:h-[90px] w-[80px] h-[70px]">
          <Image
            src={product.image}
            alt="Product image"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2 xl:max-w-[270px] max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
          <p className="leading-snug sm:line-clamp-1 line-clamp-2 font-semibold max-md:text-sm">
            {product.name}
          </p>
          <p className="text-sm max-md:text-xs font-light">
            {product.category}
          </p>
        </div>
      </div>
      <div className="col-span-2 max-md:text-sm">
        {indoCurrency(product.price)}
      </div>
      <div className="col-span-2 max-md:text-sm flex items-center justify-center text-center">
        <div className="p-1 cursor-pointer hover:opacity-80" onClick={handleReduceQuantity}>
          <CiSquareMinus className="text-xl"/>
        </div>
        <div className="min-w-4 max-md:min-w-2.5">{product.quantity}</div>
        <div className="p-1 cursor-pointer hover:opacity-80" onClick={handleAddQuantity}>
          <CiSquarePlus className="text-xl"/>
        </div>
      </div>
      <div className="col-span-2 max-md:text-sm font-semibold">
        {indoCurrency(product.price * product.quantity)}
      </div>
    </div>
  );
}