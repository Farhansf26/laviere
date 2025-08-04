"use client";

import { indoCurrency } from "@/lib/formatNumber";
import { Image as ImageType, Product } from "@/lib/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartItem, useCartStore } from "@/hooks/useCartStore";
import toast from "react-hot-toast";

interface ProductWithImages extends Product {
  images: ImageType[];
}

interface ProductDetailProps {
  product: ProductWithImages;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCartStore();

  const formattedProductToCart: CartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.images[0].url,
    category: product.categories.join(', '),
    stock: product.stock
  };

  const handleAddToCart = () => {
    addToCart(formattedProductToCart);
    toast.success("Berhasil ditambahkan");
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="relative md:h-130 md:w-130 h-75 w-75 mx-auto">
          <Image
            src={product.images[0].url}
            alt={`${product.name} image`}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col lg:py-6 xl:pr-30 z-20">
          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-3xl max-lg:text-2xl font-semibold tracking-tight">
                {product.name}
              </h3>
              <p className="font-light text-gray-600 max-lg:text-sm ">
                {product.description}
              </p>
            </div>
            <div className="flex lg:flex-col max-lg:items-center gap-4 max-lg:justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl max-lg:text-2xl font-semibold tracking-tight">
                  {indoCurrency(product.price)}
                </h1>
                <p className="font-light text-gray-600 max-lg:text-sm">
                  Stok: {product.stock} buah
                </p>
                <div className="gap-1 max-lg:hidden flex items-center flex-wrap max-lg:text-sm">
                  <h5 className="font-light">Kategori:</h5>
                  {product.categories.map((category, i) => {
                    return (
                      <p key={category}>
                        {category}
                        {i < product.categories.length - 1 && <>,</>}
                      </p>
                    );
                  })}
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="min-w-[150px] lg:w-[250px] lg:py-6 py-5 border border-gray-600 font-bold"
              >
                +Keranjang
              </Button>
            </div>
            <div className="gap-1 flex items-center -mt-4 flex-wrap text-sm lg:hidden">
              <h5 className="font-light">Kategori:</h5>
              {product.categories.map((category, i) => {
                return (
                  <p key={category}>
                    {category}
                    {i < product.categories.length - 1 && <>,</>}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
