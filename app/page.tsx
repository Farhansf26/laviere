import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import RecommendationProduct from "@/components/RecommendationProduct";
import { prisma } from "@/lib/prisma";
import ClientComponent from "@/provider/ClientComponent";

export default async function page() {
  const productsCount = await prisma.product.count()
  const categoriesCount = await prisma.category.count()
  const currentUser = await getCurrentUser()

  return (
    <div className="pb-10">
      <Hero productsCount={productsCount} categoriesCount={categoriesCount}/>
      <ClientComponent>
        <Categories/>
        <RecommendationProduct currentUser={currentUser}/>
      </ClientComponent>
    </div>
  )
}
