import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let status;
    if (body.transaction_status === "settlement") {
      status = "PAID";
    } else if (body.transaction_status === "pending") {
      status = "PENDING";
    } else if (
      body.transaction_status === "deny" ||
      "cancel" ||
      "expire" ||
      "failure"
    ) {
      status = 'CANCELED';
    }

    const order = await prisma.order.update({
      where: {
        id: body.order_id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(order)
  } catch (error: unknown) {
    console.log(error);
  }
}
