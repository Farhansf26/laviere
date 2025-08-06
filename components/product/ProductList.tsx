"use client";

import { ProductAPI } from "@/lib/types";
import ProductCard from "./ProductCard";
import { User } from "@/lib/generated/prisma";

interface ProductListProps {
  products: ProductAPI[];
  currentUser?: User | null
}

export default function ProductList({ products, currentUser }: ProductListProps) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
