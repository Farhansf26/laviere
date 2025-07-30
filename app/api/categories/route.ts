import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const body = await request.json()
    const { name, images } = body

    if(!name) return new NextResponse('Name is required', { status: 400 })
    if(!images) return new NextResponse('Image is required', { status: 400 })

    const category = await prisma.category.create({
      data: {
        name,
        images: {
          createMany: {
            data: images
          }
        }
      }
    })

    return NextResponse.json(category)
  } catch (error: unknown) {
    console.log('CATEGORIES_POST', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}