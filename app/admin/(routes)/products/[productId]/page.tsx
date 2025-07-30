import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProductForm from "./components/ProductForm"
import { ObjectId } from "mongodb";

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const { productId } = await params
  const productIdPrefix = productId.slice(0, 24)

  let product;
  if(ObjectId.isValid(productIdPrefix)) {
    product = await prisma.product.findFirst({
      where: {
        id: productIdPrefix
      },
      include: {
        images: true
      }
    })
  }

  if(!product && productId != 'new') redirect('/admin/products/new')
  if(product && productId !== product.id) redirect(`/admin/products/${product.id}`)

  const ages = await prisma.age.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="pt-5 px-8">
      <ProductForm data={product} ages={ages} categories={categories}/>
    </div>
  )
}
