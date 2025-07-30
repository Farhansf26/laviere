import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const currentUser = await getCurrentUser()
    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { productId } = await params
    if(!productId) return new NextResponse('Product id is required', { status: 400 })

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

    await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        description,
        isArchived,
        stock,
        price: parseInt(price),
        userId: currentUser.id,
        categories,
        ageId,
        images: {
          deleteMany: {}
        }
      }
    })

    const product = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        images: {
          createMany: {
            data: images
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.log('PRODUCT_PATCH', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const currentUser = await getCurrentUser()
    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { productId } = await params
    if(!productId) return new NextResponse('Product id is required', { status: 400 })

    await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        images: {
          deleteMany: {}
        }
      }
    })

    const product = await prisma.product.delete({
      where: {
        id: productId
      }
    })

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.log('PRODUCT_DELETE', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}