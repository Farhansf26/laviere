"use client";

import { Address, User } from "@/lib/generated/prisma";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressForm from "./components/AddressForm";

interface ProfileClientProps {
  currentUser?: User | null;
  address?: Address | null;
}

export default function ProfileClient({
  currentUser,
  address,
}: ProfileClientProps) {
  const fallbackUserName = currentUser?.name?.split(" ");
  const splitUsername = fallbackUserName?.map((item) => item.split("")[0]);

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-[70px] h-[70px] border border-gray-300 rounded-full overflow-hidden">
              {currentUser?.image ? (
                <Image
                  src={currentUser.image}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  {splitUsername && (
                    <p className="text-3xl">
                      {splitUsername[0].toUpperCase()}
                      {splitUsername.length > 1 &&
                        splitUsername[1]?.toUpperCase()}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center flex-col">
              <h5>{currentUser?.name}</h5>
              <p className="text-sm font-light">{currentUser?.email}</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddressForm address={address} />
      </CardContent>
    </Card>
  );
}
