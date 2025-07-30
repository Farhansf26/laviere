import { getCurrentUser } from "@/actions/getCurrentUser"
import Sidebar from "@/components/admin/Sidebar"
import ClientComponent from "@/provider/ClientComponent"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  if(!currentUser) redirect('/')

  if(currentUser.role !== 'ADMIN') redirect('/')
  
  return (
    <div className="grid grid-cols-12">
      <ClientComponent>
        <div className="col-span-2 flex justify-center sticky h-[91.5vh] top-0 border-r-2 max-lg:hidden">
          <Sidebar/>
        </div>
      </ClientComponent>
      <div className="lg:col-span-10 col-span-12">
        {children}
      </div>
    </div>
  )
}