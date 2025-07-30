"use client";

import { CartItem } from "@/hooks/useCartStore";
import { indoCurrency } from "@/lib/formatNumber";
import Image from "next/image";

interface CartItemsProps {
  product: CartItem;
}

export default function CartItems({ product }: CartItemsProps) {
  return (
    <div className="flex items-center justify-between pr-5 gap-10">
      <div className="flex items-center">
        <div className="relative lg:w-[90px] lg:h-[80px] w-[70px] h-[60px]">
          <Image
            src={product.image}
            alt="Product image"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2 max-w-[450px] max-md:max-w-[200px] max-sm:max-w-[150px]">
          <p className="leading-snug line-clamp-1 font-semibold max-md:text-sm">
            {product.name}
          </p>
          <p className="text-sm max-md:text-xs font-light">
            {product.category}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="max-md:text-sm">{product.quantity} <span>Buah</span></p>
        <p className="max-md:text-sm font-medium">{indoCurrency(product.price * product.quantity)}</p>
      </div>
    </div>
  );
}
