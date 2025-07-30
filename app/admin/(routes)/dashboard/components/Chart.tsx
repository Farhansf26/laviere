"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyOrderStats } from "@/app/admin/(routes)/dashboard/page";

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Total Pesanan",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartProps {
  orders: MonthlyOrderStats[];
}

export function Chart({ orders }: ChartProps) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Total Pesanan</CardTitle>
        <CardDescription>Januari - Desember 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={orders}
            margin={{
              top: 20,
            }}
            className="h-[50vh]"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
