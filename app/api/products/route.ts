import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { ProductAPI } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const body = await request.json()
    const {
      name,
      images,
      ageId,
      categories,
      description,
      price,
      stock,
      isArchived
    } = body

    if(!name) return new NextResponse('Name is required', { status: 401 })
    if(!images) return new NextResponse('Images is required', { status: 401 })
    if(!ageId) return new NextResponse('Age id is required', { status: 401 })
    if(!categories) return new NextResponse('Categories is required', { status: 401 })
    if(!description) return new NextResponse('Description is required', { status: 401 })
    if(!price) return new NextResponse('Price is required', { status: 401 })
    if(!stock) return new NextResponse('Stock is required', { status: 401 })

    const product = await prisma.product.create({
      data: {
        name,
        description,
        isArchived,
        stock,
        ageId,
        price: parseInt(price),
        userId: currentUser.id,
        categories,
        images: {
          createMany: {
            data: images
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.log('PRODUCT_POST', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        stock: 'desc'
      },
      include: {
        images: true,
        age: true
      }
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

    return NextResponse.json(formattedProducts)
  } catch (error: unknown) {
    console.log('PRODUCTS_GET', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}