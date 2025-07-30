"use client";

import { Image, Product } from "@/lib/generated/prisma";
import ImageComponent from "next/image";
import { FiPlusCircle } from "react-icons/fi";

interface ProductWithImage extends Product {
  images: Image[];
}

interface ProductCardProps {
  data: ProductWithImage;
}

export default function ProductCard({ data }: ProductCardProps) {
  return (
    <div className="rounded-2xl border overflow-hidden shadow-lg bg-white">
      <div className="relative w-full h-40 max-sm:h-32">
      {data.images.map((image) => ( 
          <ImageComponent
            key={image.id}
            src={image.url}
            alt="Product Image"
            fill
            className="object-cover border-b p-1"
          />
        ))}
        <div className="absolute top-2 right-2 p-1 hover:opacity-70 transition cursor-pointer">
          <FiPlusCircle className="text-[#8fa38a]" size={30}/>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <h2 className="text-xs leading-snug line-clamp-2">
          {data.name}
        </h2>
        <div className="text-gray-700 font-semibold text-sm">Rp.{data.price}</div>
      </div>
    </div>
  );
}
