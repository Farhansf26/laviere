'use client'

import { MonthlyOrderStats } from "./page"
import { TbReportMoney, TbUserFilled } from "react-icons/tb"
import { LuNotepadText } from "react-icons/lu";
import { format } from "date-fns";
import { Chart } from "./components/Chart";
import CardInfo from "./components/CardInfo";

interface DashboardClientProps {
  orders: MonthlyOrderStats[]
  totalAmount: number
}

export default function DashboardClient({ orders, totalAmount }: DashboardClientProps) {
  const date = new Date().toISOString();
  const formattedDate = format(date, 'MMMM')

  const nowMonthOrder = orders.find((order) => order.month === formattedDate)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 overflow-x-auto">
        <CardInfo
          title='Total Pemasukkan'
          description='Semua pesanan'
          icon={TbReportMoney}
          value={totalAmount || 0}
          iconColor={'text-dark-green'}
          moneyFormat
        />
        <CardInfo
          title='Total Pesanan'
          description='Dalam 1 bulan'
          icon={LuNotepadText}
          value={nowMonthOrder?.desktop || 0}
          iconColor={'text-yellow-500'}
        />
        <CardInfo
          title='Total Customer'
          description='Dalam 1 bulan'
          icon={TbUserFilled}
          value={nowMonthOrder?.uniqueUsers || 0}
          iconColor={'text-gray-600'}
        />
      </div>
      <div>
        <Chart orders={orders}/>
      </div>
    </div>
  )
}
