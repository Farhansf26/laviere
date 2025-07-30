import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrderClient from "./components/OrderClient";

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      address: true,
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (order && orderId !== order.id) redirect(`/admin/orders/${order.id}`);
  if (!order) redirect("/admin/orders");

  return (
    <div>
      <OrderClient order={order} />
    </div>
  );
}
