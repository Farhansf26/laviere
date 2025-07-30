import ClientComponent from "@/provider/ClientComponent";
import DashboardClient from "./DashboardClient";
import { prisma } from "@/lib/prisma";

export type MonthlyOrderStats = {
  month: string;
  desktop: number; // totalOrder
  uniqueUsers: number;
};

function getMonthName(monthNumber: number) {
  const date = new Date(2000, monthNumber - 1); // tahun arbitrary
  return date.toLocaleString("default", { month: "long" });
}

export default async function AdminDashboardPage() {
  let results;

  const orders = await prisma.order.aggregateRaw({
    pipeline: [
      {
        $match: {
          status: "COMPLETED",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrder: { $sum: 1 },
          users: { $addToSet: "$userId" }, // 👈 kumpulkan user unik
        },
      },
      {
        $project: {
          _id: 1,
          totalOrder: 1,
          uniqueUsers: { $size: "$users" }, // 👈 hitung banyaknya user unik
        },
      },
      {
        $sort: { _id: 1 },
      },
    ],
  });

  if (!orders) {
    results = [];
  } else {
    results = orders;
  }

  const resultMap = new Map<
    number,
    { totalOrder: number; uniqueUsers: number }
  >();
  results.forEach((item) => {
    resultMap.set(item._id, {
      totalOrder: item.totalOrder,
      uniqueUsers: item.uniqueUsers,
    });
  });

  const fullMonths: MonthlyOrderStats[] = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1; // 1 = January
    const data = resultMap.get(monthIndex);
    return {
      month: getMonthName(monthIndex),
      desktop: data?.totalOrder || 0,
      uniqueUsers: data?.uniqueUsers || 0,
    };
  });

  const totalOrders = await prisma.order.findMany({
    where: {
      status: "COMPLETED",
    },
  });

  const totalAmount = totalOrders.reduce(
    (prev, curr) => prev + curr.totalAmount,
    0
  );

  return (
    <div className="px-4 py-5">
      <ClientComponent>
        <DashboardClient orders={fullMonths} totalAmount={totalAmount} />
      </ClientComponent>
    </div>
  );
}
