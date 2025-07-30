import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import RecommendationProduct from "@/components/RecommendationProduct";
import { prisma } from "@/lib/prisma";
import ClientComponent from "@/provider/ClientComponent";

export default async function page() {
  const productsCount = await prisma.product.count()
  const categoriesCount = await prisma.category.count()

  return (
    <div className="pb-10">
      <Hero productsCount={productsCount} categoriesCount={categoriesCount}/>
      <ClientComponent>
        <Categories/>
        <RecommendationProduct/>
      </ClientComponent>
    </div>
  )
}
