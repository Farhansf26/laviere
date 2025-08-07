"use client";

import ProductList from "@/components/product/ProductList";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { User } from "@/lib/generated/prisma";
import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
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

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/recommend/favorites`,
          {
            product_ids: currentUser.favoriteIds,
          }
        );
        setRecommendedProducts(response.data.results.recommended_products);
      } catch (error: unknown) {
        toast.error("Gagal memuat produk rekomendasi.");
      }
    };

    fetchData();
  }, [currentUser.favoriteIds]);

  if (products.length < 1) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <Heading
            title="Tidak ada produk favorit"
            description="Belum ada produk yang ditambahkan ke dalam favorit"
            center
          />
          <div>
            <Button
              className="max-md:scale-80"
              onClick={() => router.push("/")}
            >
              Kembali ke Beranda <FaHome />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="2xl:px-10 px-8 py-5 container mx-auto space-y-10">
        <ProductList products={products} currentUser={currentUser} />
      </div>
      <div className="flex items-center justify-center gap-2 text-xl font-medium tracking-tight">
        <h1>Produk produk yang mungkin anda suka juga</h1>
        <HiArrowCircleDown color="green" className="scale-125" />
      </div>
      <div className="2xl:px-10 px-8 py-5 container mx-auto space-y-10">
        <ProductList products={recommendedProducts} currentUser={currentUser} />
      </div>
    </div>
  );
}
