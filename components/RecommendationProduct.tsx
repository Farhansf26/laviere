"use client";

import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductList from "./product/ProductList";
import { FaRegThumbsUp } from "react-icons/fa";
import { Element } from "react-scroll";

export default function RecommendationProduct() {
  const [recommendedProducts, setRecommendedProducts] = useState<ProductAPI[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recommend/purchased-items`)
        console.log(response)
        setRecommendedProducts(response.data.results.recommended_products)
      } catch (error: unknown) {
        toast.error("Gagal memuat produk rekomendasi.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-4 bg-white">
      <div className="flex flex-col items-center justify-center">
        <Element name="recommendation">
          <h2 className="lg:text-2xl text-xl font-bold tracking-tight flex items-start gap-1">
            Rekomendasi <FaRegThumbsUp />
          </h2>
        </Element>
        <p className="font-light max-md:text-sm">
          Produk produk yang mungkin ada juga cari
        </p>
      </div>
      <div className="2xl:px-32 px-8 py-4 container mx-auto space-y-10">
        <ProductList products={recommendedProducts} />
      </div>
    </div>
  );
}
