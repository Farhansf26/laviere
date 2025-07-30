import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    if(currentUser.role !== 'ADMIN') return new NextResponse('Unauthorized', { status: 401 })

    const body = await request.json()
    const { name } = body

    if(!name) return new NextResponse('Name is required', { status: 400 })

    const age = await prisma.age.create({
      data: {
        name
      }
    })

    return NextResponse.json(age)
  } catch (error: unknown) {
    console.log('AGES_POST', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}