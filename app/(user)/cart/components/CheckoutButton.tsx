"use client";

import { Button } from "@/components/ui/button";
import { useSignInModal } from "@/hooks/useSignInModal";
import { User } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  currentUser?: User | null;
}

export default function CheckoutButton({ currentUser }: CheckoutButtonProps) {
  const router = useRouter();
  const signInModal = useSignInModal();

  const handleClick = () => {
    if (!currentUser) {
      return signInModal.onOpen();
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div>
      <Button className="w-full" onClick={handleClick}>
        Checkout
      </Button>
    </div>
  );
}
