import { indoCurrency } from "@/lib/formatNumber";
import { MdOutlineEventNote } from "react-icons/md";
import CheckoutButton from "./CheckoutButton";
import { User } from "@/lib/generated/prisma";

interface SummaryProps {
  totalPrice: number
  totalProduct: number
  currentUser?: User | null
}

export default function Summary({ totalPrice, totalProduct, currentUser }: SummaryProps) {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-4 min-w-[300px] space-y-2">
      <div className="space-y-2">
        <h1 className="text-2xl max-lg:text-lg font-semibold tracking-tight flex items-center gap-1">
          Pesananmu <MdOutlineEventNote/>
        </h1>
        <div className="flex items-center justify-between max-lg:text-sm text-[15px]">
          <p className="font-light">Total Barang</p>
          <p className="font-semibold">{totalProduct} Produk</p>
        </div>
        <div className="flex items-center justify-between max-lg:text-sm text-[15px]">
          <p className="font-light">Total harga</p>
          <p className="font-semibold">{indoCurrency(totalPrice)}</p>
        </div>
      </div>
      <CheckoutButton currentUser={currentUser}/>
    </div>
  );
}
