import { prisma } from "@/lib/prisma"
import { OrdersColumn } from "./components/columns"
import { format } from "date-fns"
import OrdersClient from "./components/client"

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      address: true,
      user: true
    }
  })

  const formattedOrders: OrdersColumn[] = orders.map((order) => ({
    id: order.id,
    order_id: `ODR-${order.id.slice(0, 8)}`,
    user_name: order.user.name,
    phoneNumber: order.address.phoneNumber,
    address: `${order.address.name}, ${order.address.city}, ${order.address.zipCode}`,
    status: order.status,
    createdAt: format(order.createdAt, 'dd MMMM yyyy')
  }))

  return (
    <div>
      <OrdersClient data={formattedOrders}/>
    </div>
  )
}
