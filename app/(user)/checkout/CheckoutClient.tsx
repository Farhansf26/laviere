"use client";

import Heading from "@/components/ui/heading";
import { Address, User } from "@/lib/generated/prisma";
import { useCartStore } from "@/hooks/useCartStore";
import CartItems from "./components/CartItems";
import { indoCurrency } from "@/lib/formatNumber";
import { Button } from "@/components/ui/button";
import { FaBoxOpen } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { useEffect, useRef } from "react";
import ShippingInfo from "./components/ShippingInfo";
import axios from "axios";
import { useAddressModal } from "@/hooks/useAddressModal";

interface CheckoutClientProps {
  currentUser: User;
  address?: Address | null;
}

export default function CheckoutClient({
  currentUser,
  address,
}: CheckoutClientProps) {
  const { cart, totalPrice } = useCartStore();
  const addressModal = useAddressModal();
  const totalAmount = totalPrice();
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!address && !hasOpened.current) {
      addressModal.onOpen();
      hasOpened.current = true;
    }
  }, [address, addressModal]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT || "";

    const scriptTag = document.createElement("script");
    scriptTag.src = snapScript;

    scriptTag.setAttribute("data-client-key", clientKey);
    scriptTag.async = true;

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = async () => {
    if(!address) return addressModal.onOpen()

    try {
      const response = await axios.post("/api/tokenizer", {
        cartItems: cart,
        address,
        totalAmount,
      });

      console.log(response);

      // @ts-expect-error will mount after the user clicked the button
      window.snap.pay(response.data.token);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto 2xl:px-20 px-5 py-7 space-y-5">
      <div>
        <Heading title="Konfirmasi Pesanan" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 max-lg:col-span-12">
          <div className="max-h-[55vh] overflow-y-scroll space-y-5">
            {cart.map((item) => (
              <CartItems key={item.id} product={item} />
            ))}
          </div>
        </div>

        <div className="col-span-4 max-lg:col-span-12 space-y-4">
          <ShippingInfo currentUser={currentUser} address={address} />

          <div className="space-y-1">
            <h1 className="text-2xl max-md:text-xl font-semibold tracking-tight">
              Pesananmu
            </h1>
            <div className="border border-gray-300 shadow-lg p-3 rounded-lg space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between max-md:text-sm font-light">
                  <div className="flex items-center gap-1.5">
                    <FaBoxOpen />
                    <p>Total Barang</p>
                  </div>
                  <p className="font-semibold">{cart.length} Buah</p>
                </div>
                <div className="flex items-center justify-between max-md:text-sm font-light">
                  <div className="flex items-center gap-1.5">
                    <GiTakeMyMoney />
                    <p>Total Harga</p>
                  </div>
                  <p className="font-semibold">{indoCurrency(totalPrice())}</p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  variant="lbrown"
                  className="md:py-5 w-[50%] border border-black"
                  onClick={handlePayment}
                >
                  Bayar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
