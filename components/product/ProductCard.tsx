"use client";

import { Button } from "@/components/ui/button";
import { CartItem, useCartStore } from "@/hooks/useCartStore";
import { indoCurrency } from "@/lib/formatNumber";
import { ProductAPI } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import HeartButton from "../HeartButton";
import { User } from "@/lib/generated/prisma";

interface ProductCardProps {
  product: ProductAPI;
  currentUser?: User | null
}

export default function ProductCard({ product, currentUser }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();

  const formattedProductToCart: CartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.images[0],
    category: product.categories.join(", "),
    stock: product.stock,
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(formattedProductToCart);
    toast.success("Berhasil ditambahkan");
  };

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="border-2 border-gray-300/80 rounded-lg overflow-hidden shadow-md hover:shadow-lg 
      bg-white cursor-pointer"
    >
      <div className="relative aspect-square">
        <Image
          src={product.images[0]}
          alt={`${product.name} image`}
          fill
          className="object-cover h-full w-full"
        />
        <div className="absolute top-3 right-3">
          <HeartButton currentUser={currentUser} productId={product.id}/>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-4 justify-between border-t">
        <h5 className="leading-snug line-clamp-2 text-sm min-h-[2.5rem]">
          {product.name}
        </h5>

        <div className="flex items-center flex-wrap gap-2 justify-between">
          <p className="text-sm font-bold">{indoCurrency(product.price)}</p>
          <Button
            className="border shadow-lg border-gray-600 w-full md:w-auto px-3 font-semibold"
            onClick={handleAddToCart}
            type="button"
          >
            +Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
}
