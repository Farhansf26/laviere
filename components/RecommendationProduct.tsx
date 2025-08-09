"use client";

import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductList from "./product/ProductList";
import { FaLightbulb } from "react-icons/fa";
import { Element } from "react-scroll";
import { User } from "@/lib/generated/prisma";
import Heading from "./ui/heading";

interface RecommendationProductProps {
  currentUser?: User | null
}

export default function RecommendationProduct({ currentUser }: RecommendationProductProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<ProductAPI[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recommend/purchased-items`)
        setRecommendedProducts(response.data.results.recommended_products)
      } catch (error: unknown) {
        toast.error("Gagal memuat produk rekomendasi.");
      }
    };

    fetchData();
  }, []);

  if(recommendedProducts.length < 1) {
    return (
      <div className="text-red-500 scale-80">
        <Heading
          title='Gagal Memuat Rekomendasi Produk'
          center
        />
        <p className='md:text-lg text-sm font-light text-muted-foreground text-center'>Tunggu sebentar atau coba refresh halaman</p>
      </div>
    )
  }

  return (
    <div className="pt-4 bg-white">
      <div className="flex flex-col items-center justify-center">
        <Element name="recommendation">
          <h2 className="lg:text-2xl text-xl font-bold tracking-tight flex items-start gap-1">
            Rekomendasi <FaLightbulb />
          </h2>
        </Element>
        <p className="font-light max-md:text-sm">
          Produk produk yang mungkin ada juga cari
        </p>
      </div>
      <div className="2xl:px-32 px-8 py-4 container mx-auto space-y-10">
        <ProductList products={recommendedProducts} currentUser={currentUser}/>
      </div>
    </div>
  );
}
