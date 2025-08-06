import { prisma } from "@/lib/prisma"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import ProductClient from "./ProductClient"
import { getCurrentUser } from "@/actions/getCurrentUser"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  const currentUser = await getCurrentUser()

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
  
  if(product && productId !== product.id) redirect(`/products/${product.id}`)
  if(!product) redirect('/')
  
  return (
    <div>
      <ProductClient product={product} currentUser={currentUser}/>
    </div>
  )
}
