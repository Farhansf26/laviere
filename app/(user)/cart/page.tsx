import { getCurrentUser } from "@/actions/getCurrentUser";
import CartClient from "./CartClient";

export default async function CartPage() {
  const currentUser = await getCurrentUser()
  
  return (
    <div className="bg-white min-h-[70vh]">
      <CartClient currentUser={currentUser}/>
    </div>
  )
}
