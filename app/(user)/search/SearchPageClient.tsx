"use client";

import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductList from "@/components/product/ProductList";
import SearchFallback from "./SearchFallback";
import { User } from "@/lib/generated/prisma";

interface SearchPageClientProps {
  currentUser?: User | null
}

export default function SearchPageClient({ currentUser }: SearchPageClientProps) {
  const [matchedProducts, setMatchedProducts] = useState<ProductAPI[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<ProductAPI[]>(
    []
  );
  const router = useRouter();

  const searchParams = useSearchParams();
  const key = searchParams?.get("q");

  useEffect(() => {
    if (!key) {
      return router.push("/search");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/recommend?keyword=${key}`
        );
        setMatchedProducts(response?.data?.results.matched_products);
        setRecommendedProducts(response?.data?.results.recommended_products);
      } catch (error: unknown) {
        toast.error("Failed to get data, please try again!");
      }
    };
    fetchData();
  }, [key, router]);

  if (matchedProducts.length < 1) return <SearchFallback />;

  return (
    <div className="2xl:px-32 px-8 py-5 container mx-auto space-y-10">
      <div>
        <ProductList products={matchedProducts} currentUser={currentUser}/>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">Produk Terkait</h3>
        <ProductList products={recommendedProducts} currentUser={currentUser}/>
      </div>
    </div>
  );
}