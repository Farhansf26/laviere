"use client";

import ProductList from "@/components/product/ProductList";
import { User } from "@/lib/generated/prisma";
import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowCircleDown } from "react-icons/hi";

interface FavoritesClientProps {
  products: ProductAPI[];
  currentUser: User;
}

export default function FavoritesClient({
  currentUser,
  products,
}: FavoritesClientProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<ProductAPI[]>(
      []
    );
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recommend/favorites`, {
            product_ids: currentUser.favoriteIds
          })
          setRecommendedProducts(response.data.results.recommended_products)
          console.log(response.data.results.recommended_products)
        } catch (error: unknown) {
          toast.error("Gagal memuat produk rekomendasi.");
        }
      };
  
      fetchData();
    }, [currentUser.favoriteIds]);

  return (
    <div>
      <div className="2xl:px-10 px-8 py-5 container mx-auto space-y-10">
        <ProductList products={products} currentUser={currentUser} />
      </div>
      <div className="flex items-center justify-center gap-2 text-xl font-medium tracking-tight">
        <h1>Produk produk yang mungkin anda suka juga</h1>
        <HiArrowCircleDown color="green" className="scale-125"/>
      </div>
      <div className="2xl:px-10 px-8 py-5 container mx-auto space-y-10">
        <ProductList products={recommendedProducts} currentUser={currentUser} />
      </div>
    </div>
  );
}
