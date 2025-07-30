import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: {
    orderId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return new NextResponse("Unauthenticated", { status: 401 });

    const { orderId } = await params;
    const body = await request.json();
    const { status } = body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
    });

    if (status === "COMPLETED") {
      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { stock: true },
        });

        if (!product) continue;

        const newStock = product.stock - item.quantity;

        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
            isArchived: newStock <= 0,
          },
        });
      }
    }

    return NextResponse.json(order);
  } catch (error: unknown) {
    console.log("ORDER_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return new NextResponse("Unauthenticated", { status: 401 });

    const { orderId } = await params;

    await prisma.orderItem.deleteMany({
      where: {
        orderId,
      },
    });

    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error: unknown) {
    console.log("ORDER_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
