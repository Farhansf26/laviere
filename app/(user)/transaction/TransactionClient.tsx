"use client";

import thanksImg from "@/public/images/thanku.png";
import oopsImg from "@/public/images/oops.png";
import sadImg from "@/public/images/sad.png";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TransactionClientProps {
  transactionStatus: string;
}

interface IStatusMessage {
  title: string;
  description: string;
  image: StaticImageData;
  status: string | string[];
}

export default function TransactionClient({
  transactionStatus,
}: TransactionClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    setTimeout(() => {
      router.push('/orders')
    }, 3000);
  }

  const statusMessage: IStatusMessage[] = [
    {
      title: "Pembayaran Berhasil",
      description: "Terima kasih telah berbelanja di toko kami",
      image: thanksImg,
      status: "settlement",
    },
    {
      title: "Pembayaran Tertunda",
      description: "Menunggu pembayaran",
      image: sadImg,
      status: "pending",
    },
    {
      title: "Pembayaran Gagal",
      description: "Maaf pembayaran tidak berhasil",
      image: oopsImg,
      status: ["deny", "cancel", "expire", "failure"],
    },
  ];

  const matchedStatus = statusMessage.find((item) =>
    Array.isArray(item.status)
      ? item.status.includes(transactionStatus)
      : item.status === transactionStatus
  );

  return (
    <div className="flex items-center justify-center min-h-[70vh] max-md:flex-col">
      <div className="relative aspect-square md:w-[300px] w-[200px]">
        <Image
          src={matchedStatus?.image || ""}
          alt="Status Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col max-md:items-center">
        <h1 className="text-3xl max-md:text-2xl font-semibold">
          {matchedStatus?.title}
        </h1>
        <p className="font-light max-md:text-sm">
          {matchedStatus?.description}
        </p>
      </div>
    </div>
  );
}
