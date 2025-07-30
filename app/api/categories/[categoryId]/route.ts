import { getCurrentUser } from "@/actions/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { categoryId: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { categoryId } = await params
    if(!categoryId) return new NextResponse('Category id is required', { status: 400 })

    const body = await request.json()
    const { name, images } = body

    if(!name) return new NextResponse('Name is required', { status: 400 })
    if(!images) return new NextResponse('Images is required', { status: 400 })

    await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        name,
        images: {
          deleteMany: {}
        }
      }
    })

    const category = await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        images: {
          createMany: {
            data: images
          }
        }
      }
    })

    return NextResponse.json(category)
  } catch (error: unknown) {
    console.log('CATEGORY_PATCH', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { categoryId: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { categoryId } = await params
    if(!categoryId) return new NextResponse('Category id is required', { status: 400 })

    await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        images: {
          deleteMany: {}
        }
      }
    })

    const category = await prisma.category.delete({
      where: {
        id: categoryId
      }
    })

    return NextResponse.json(category)
  } catch (error: unknown) {
    console.log('CATEGORY_DELETE', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}