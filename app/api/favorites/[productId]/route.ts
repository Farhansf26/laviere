import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  productId?: string
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

  const { productId } = await params

  if(!productId) return new NextResponse('Product ID is required', { status: 400 })

  const favoriteIds = [...(currentUser.favoriteIds || []), productId]

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds 
    }
  })

  return NextResponse.json(user)
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

  const { productId } = await params

  if(!productId) return new NextResponse('Product ID is required', { status: 400 })

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== productId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}