import { getCurrentUser } from "@/actions/getCurrentUser"
import ProfileClient from "./ProfileClient"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ClientComponent from "@/provider/ClientComponent"

export default async function ProfilePage() {
  const currentUser = await getCurrentUser()
  if(!currentUser) redirect('/')

  const address = await prisma.address.findFirst({
    where: {
      userId: currentUser.id
    }
  })

  return (
    <div className="container mx-auto 2xl:px-20 px-5 py-7 space-y-5">
      <ClientComponent>
        <ProfileClient currentUser={currentUser} address={address}/>
      </ClientComponent>
    </div>
  )
}
