export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import OrdersClient from "./OrdersClient"

export default async function OrdersPage() {
  const currentUser = await getCurrentUser()
  
  if(!currentUser) redirect('/')

  const orders = await prisma.order.findMany({
    where: {
      userId: currentUser.id
    },
    include: {
      address: true,
      orderItems: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto min-h-[70vh] 2xl:px-32 px-8 py-5">
      <OrdersClient orders={orders}/>
    </div>
  )
}
