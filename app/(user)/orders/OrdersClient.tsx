"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@/lib/generated/prisma";
import Image from "next/image";
import { FaRegCheckCircle, FaShippingFast } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { indoCurrency } from "@/lib/formatNumber";
import { addDays, format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";

type OrdersWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    address: true,
    orderItems: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
      };
    };
  };
}>;

interface OrdersClientProps {
  orders: OrdersWithItemsAndProducts[];
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  return (
    <div className="space-y-2">
      <div>
        <div className="flex items-center gap-1">
          <GiShoppingBag className="md:text-2xl -translate-y-0.5"/>
          <h1 className="md:text-3xl text-xl font-bold tracking-tight">Pesanan Saya</h1>
        </div>
        <p className="md:text-sm text-xs font-light text-muted-foreground pl-7.5 max-md:pl-5">Produk produk yang telah anda pesan</p>
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          let status;
          if (order.status === "PENDING") {
            status = "Pending";
          } else if (order.status === "PAID") {
            status = "Diproses";
          } else if (order.status === "SHIPPED") {
            status = "Dalam Perjalanan";
          } else if (order.status === "CANCELED") {
            status = "Dibatalkan";
          } else if (order.status === "COMPLETED") {
            status = "Pesanan Selesai";
          }

          return (
            <div
              key={order.id}
              className="border border-gray-200 shadow-lg rounded-lg"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <div className="flex items-center gap-1">
                  <BiSolidShoppingBagAlt className="-translate-y-0.5 text-xl max-lg:text-base" />
                  <p className="max-lg:text-xs text-sm font-bold">
                    ODR-{order.id.slice(0, 8)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm max-md:text-xs font-light">
                  <CiCalendarDate />
                  <p>
                    Estimasi:{" "}
                    {format(addDays(order.createdAt, 3), "dd MMMM yyyy")}
                  </p>
                </div>
                <div>
                  <Button
                    variant={
                      order.status === "PENDING"
                        ? "secondary"
                        : order.status === "PAID"
                        ? "green"
                        : order.status === "SHIPPED"
                        ? "lbrown"
                        : order.status === "COMPLETED"
                        ? "default"
                        : order.status === "CANCELED"
                        ? "destructive"
                        : "default"
                    }
                    className="rounded-full flex items-center gap-1 max-lg:text-xs"
                  >
                    {status}
                    {order.status === "PENDING" ? (
                      <IoTimeOutline />
                    ) : order.status === "PAID" ? (
                      <FaRegCheckCircle />
                    ) : order.status === "SHIPPED" ? (
                      <FaShippingFast />
                    ) : order.status === "COMPLETED" ? (
                      <BsCheckAll />
                    ) : order.status === "CANCELED" && (
                      <RxCrossCircled />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-4 py-2">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="border shadow-md rounded-xl overflow-hidden py-2
                    flex items-center"
                  >
                    <div className="relative lg:w-[100px] lg:h-[90px] w-[80px] h-[70px]">
                      <Image
                        src={item.product.images[0].url}
                        alt="Product Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 w-full md:pr-5 pr-2">
                      <h3
                        className="font-semibold tracking-tight max-lg:text-sm leading-snug 
                      line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 max-lg:text-sm">
                          <p className="font-medium">
                            {indoCurrency(item.product.price)}
                          </p>
                          <p className="font-light text-gray-600">
                            x {item.quantity}
                          </p>
                        </div>
                        <p className="max-md:text-sm font-medium">
                          {indoCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-sm max-lg:text-xs font-light">
                        {item.product.categories.join(" ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t flex justify-between px-3 py-2">
                <div className="flex items-center gap-1 text-sm max-md:text-xs xl:max-w-[900px] md:max-w-[500px] max-md:max-w-[265px]">
                  <MdOutlineLocationOn className="-translate-y-[1px]"/>
                  <p className="line-clamp-1 leading-snug">{order.address.name}, {order.address.city}</p>
                </div>
                <div className="flex items-center gap-1 max-lg:text-sm">
                  <p>Total: </p>
                  <p className="font-bold">{indoCurrency(order.totalAmount)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
