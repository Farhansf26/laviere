import { NextRequest, NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { CartItem } from "@/hooks/useCartStore";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/actions/getCurrentUser";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    const splitUsername = currentUser?.name?.split(' ')
    const first_name = splitUsername?.[0]
    const last_name = splitUsername && splitUsername?.length > 1 ? splitUsername?.[1] : ''

    if (!currentUser)
      return new NextResponse("Unauthenticated", { status: 401 });

    const body = await request.json();
    const { cartItems, address, totalAmount } = body;

    const order = await prisma.order.create({
      data: {
        addressId: address.id,
        userId: currentUser.id,
        totalAmount,
      },
    });

    await prisma.orderItem.createMany({
      data: cartItems.map((item) => ({
        productId: item.id,
        orderId: order.id,
        quantity: item.quantity,
      })),
    });

    const parameter = {
      item_details: cartItems.map((item: CartItem) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name.slice(0, 20),
      })),
      transaction_details: {
        order_id: order.id,
        gross_amount: totalAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name,
        last_name,
        email: currentUser.email,
        phone: address.phoneNumber,
      },
    };

    const token = await snap.createTransaction(parameter)
    return NextResponse.json(token)
  } catch (error: unknown) {
    console.log(error)
  }
}
