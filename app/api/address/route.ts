import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return new NextResponse("Unauthenticated", { status: 401 });

    const body = await request.json();

    const { name, subdistrict, city, province, phoneNumber, zipCode } = body;

    if (!name) return new NextResponse("Alamat is required!", { status: 400 });
    if (!subdistrict)
      return new NextResponse("Kecamatan is required!", { status: 400 });
    if (!city) return new NextResponse("Kota is required!", { status: 400 });
    if (!province)
      return new NextResponse("Provinsi is required!", { status: 400 });
    if (!phoneNumber)
      return new NextResponse("No Telp is required!", { status: 400 });
    if (!zipCode)
      return new NextResponse("Zip Code is required!", { status: 400 });

    const address = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        addresses: {
          create: {
            name,
            subdistrict,
            city,
            province,
            phoneNumber,
            zipCode,
          },
        },
      },
    });

    return NextResponse.json(address)
  } catch (error: unknown) {
    console.log('ADDRESS_POST', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
