"use client";

import ProductDetail from "@/components/product/ProductDetail";
import ProductList from "@/components/product/ProductList";
import { Image, Product } from "@/lib/generated/prisma";
import { ProductAPI } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProductWithImages extends Product {
  images: Image[]
}

interface ProductClientProps {
  product: ProductWithImages;
}

export default function ProductClient({
  product,
}: ProductClientProps) {
  const [matchedProducts, setMatchedProducts] = useState<ProductAPI[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<ProductAPI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recommend?keyword=${product.name}`);
        setMatchedProducts(response?.data?.results.matched_products);
        setRecommendedProducts(response?.data?.results.recommended_products);
      } catch (error: unknown) {
        toast.error("Failed to get related products, please try again!");
      }
    };
    fetchData();
  }, [product.name]);

  const combinedProducts = matchedProducts.concat(recommendedProducts)
  const relatedProducts = combinedProducts.filter((item) => item.id !== product.id).slice(0, 25)

  return (
    <div className="space-y-10 py-4 px-8 bg-gradient-to-b from-white to-custom-white">
      <ProductDetail product={product} />
      <div className="w-full border lg:hidden"/>
      <div className="2xl:px-32 container mx-auto space-y-4">
        <h3 className="text-center text-2xl font-semibold">Produk Terkait</h3>
        <ProductList products={relatedProducts} />
      </div>
    </div>
  );
}
