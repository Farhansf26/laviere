import { getCurrentUser } from "@/actions/getCurrentUser"
import { redirect } from "next/navigation"
import FavoritesClient from "./FavoritesClient"
import { prisma } from "@/lib/prisma"
import { ProductAPI } from "@/lib/types"

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser()

  if(!currentUser) redirect('/')

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds
      }
    },
    include: {
      age: true,
      images: true
    }
  })

  const formattedProduct: ProductAPI[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    age_name: product.age.name,
    categories: product.categories,
    images: [product.images[0].url],
    price: product.price,
    stock: product.stock
  }))

  return (
    <div>
      <FavoritesClient products={formattedProduct} currentUser={currentUser}/>
    </div>
  )
}
