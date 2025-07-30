'use server'

import { prisma } from "@/lib/prisma"
import { ProductAPI } from "@/lib/types"

export const getIntialSuggestProduct = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      stock: 'asc'
    },
    include: {
      images: true,
      age: true
    },
    take: 15
  })

  const formattedProducts: ProductAPI[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categories: product.categories,
    age_name: product.age.name,
    images: product.images.map((image) => image.url)
  }))

  return formattedProducts
}