import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { addressId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return new NextResponse("Unauthenticated", { status: 401 });

    const { addressId } = await params;

    if (!addressId)
      return new NextResponse("Address ID is required!", { status: 400 });

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

    const address = await prisma.address.update({
      where: {
        id: addressId,
        userId: currentUser.id,
      },
      data: {
        name,
        subdistrict,
        city,
        province,
        phoneNumber,
        zipCode
      },
    });

    return NextResponse.json(address)
  } catch (error: unknown) {
    console.log('ADDRESS_PATCH', error)
    return new NextResponse('Internal error.', { status: 500 })
  }
}
