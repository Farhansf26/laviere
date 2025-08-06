import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchPageClient from "./SearchPageClient";

export default async function SearchPage() {
  const currentUser = await getCurrentUser()
  
  return (
    <div>
      <SearchPageClient currentUser={currentUser}/>
    </div>
  )
}
