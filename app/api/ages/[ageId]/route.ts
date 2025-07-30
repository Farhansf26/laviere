import { getCurrentUser } from "@/actions/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { ageId: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { ageId } = await params
    if(!ageId) return new NextResponse('Age id is required', { status: 400 })

    const body = await request.json()
    const { name } = body

    if(!name) return new NextResponse('Name is required', { status: 400 })

    const age = await prisma.age.update({
      where: {
        id: ageId
      },
      data: {
        name
      }
    })

    return NextResponse.json(age)
  } catch (error: unknown) {
    console.log('AGES_PATCH', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { ageId: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const { ageId } = await params
    if(!ageId) return new NextResponse('Age id is required', { status: 400 })

    const age = await prisma.age.delete({
      where: {
        id: ageId
      }
    })

    return NextResponse.json(age)
  } catch (error: unknown) {
    console.log('AGES_DELETE', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}