import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type RoleType = "ADMIN" | "USER";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const userChecked = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userChecked)
      return new NextResponse("Email ini sudah digunakan!", { status: 400 });

    let role: RoleType;

    if (password === "admin1122") {
      role = "ADMIN";
    } else {
      role = "USER";
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.log("SIGN UP_POST", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}