'use client'

import { Button } from "@/components/ui/button";
import { Address, User } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { TiLocationOutline } from "react-icons/ti";

interface ShippingInfoProps {
  currentUser: User
  address?: Address | null
}

export default function ShippingInfo({ currentUser, address }: ShippingInfoProps) {
  const router = useRouter()
  
  return (
    <div className="space-y-1">
      <h1 className="text-2xl max-md:text-xl font-semibold tracking-tight">
        Informasi Pengiriman
      </h1>
      <div className="space-y-3 h-fit border border-gray-300 shadow-lg p-3 rounded-lg">
        <div className="space-y-1">
          <div className="max-md:text-sm flex items-center gap-1.5 font-medium">
            <IoIosPerson />
            <p>{currentUser.name}</p>
          </div>
          <div className="max-md:text-sm flex items-center gap-1.5 font-light">
            <MdPhone />
            <p>{address?.phoneNumber}</p>
          </div>
          <div className="max-md:text-sm flex items-center gap-1.5 font-light">
            <MdOutlineEmail />
            <p>{currentUser.email}</p>
          </div>
          <div className="flex items-start max-md:text-sm gap-1.5 font-light">
            <div className="mt-0.5">
              <TiLocationOutline />
            </div>
            <div className="flex items-center gap-1">
              {address?.name}
              {address && <>, </>}
              {address?.subdistrict}
              {address && <>, </>}
              {address?.city}
              {address && <>, </>}
              {address?.province}
              {address && <>, </>}
              {address?.zipCode}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button type="button" onClick={() => router.push("/profile")}>
              Ubah Alamat <CiEdit />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
