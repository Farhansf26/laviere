import { getCurrentUser } from "@/actions/getCurrentUser";
import CheckoutClient from "./CheckoutClient";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ClientComponent from "@/provider/ClientComponent";

export default async function CheckoutPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/");

  const address = await prisma.address.findFirst({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <div>
      <ClientComponent>
        <CheckoutClient currentUser={currentUser} address={address} />
      </ClientComponent>
    </div>
  );
}
