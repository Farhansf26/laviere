"use client";

import Heading from "@/components/ui/heading";
import { indoCurrency } from "@/lib/formatNumber";
import { Prisma } from "@/lib/generated/prisma";
import Image from "next/image";
import ShippingInfo from "./ShippingInfo";

type OrderWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    user: true;
    address: true;
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

interface OrderClientProps {
  order: OrderWithItemsAndProducts;
}

export default function OrderClient({ order }: OrderClientProps) {
  return (
    <div className="px-8 pt-5">
      <div className="mb-2">
        <Heading 
          title="Order Detail"
          description={`ID Order: ODR-${order.id.slice(0, 8)}`}
        />
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 col-span-2">
          <div
            key={order.id}
            className="border border-gray-200 shadow-lg rounded-lg"
          >
            <div className="flex flex-col gap-2 px-4 py-2 max-h-[50vh] overflow-y-scroll">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="border shadow-md rounded-xl py-2
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
            <div className="flex justify-end px-3 py-2">
              <div className="flex items-center gap-1 max-lg:text-sm">
                <p>Total: </p>
                <p className="font-bold">{indoCurrency(order.totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1"> 
          <ShippingInfo currentUser={order.user} address={order.address} />
        </div>
      </div>
    </div>
  );
}
