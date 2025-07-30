import { ProductsColumn } from "./components/columns";
import { prisma } from "@/lib/prisma";
import { format } from 'date-fns'
import ProductsClient from "./components/client";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        age: true,
        images: true
      }
    })

  const formattedProducts: ProductsColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    age: product.age.name,
    images: product.images,
    categories: product.categories.map((category) => category),
    price: product.price,
    description: product.description,
    stock: product.stock,
    isArchived: product.isArchived,
    createdAt: format(product.createdAt, 'MMMM, dd yyyy')
  }))

  return <ProductsClient data={formattedProducts}/>
}
