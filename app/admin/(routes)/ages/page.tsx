import { prisma } from "@/lib/prisma"
import { AgesColumn } from "./components/columns"
import { format } from "date-fns"
import AgesClient from "./components/client"

export default async function AgesPage() {
  const ages = await prisma.age.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedAges: AgesColumn[] = ages.map((age) => ({
    id: age.id,
    name: age.name,
    createdAt: format(age.createdAt, 'MMMM, do yyyy')
  }))
  
  return <AgesClient data={formattedAges}/>
}
