import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import AgeForm from "./components/AgeForm"
import { ObjectId } from "mongodb"

export default async function AgePage({ params }: { params: { ageId: string } }) {
  const { ageId } = await params

  const ageIdPrefix = ageId.slice(0, 24)

  let age;

  if(ObjectId.isValid(ageIdPrefix)) {
    age = await prisma.age.findFirst({
      where: {
        id: ageIdPrefix
      }
    })
  }

  if(!age && ageId != 'new') redirect('/admin/ages/new')
  
  if(age && ageId !== age.id) redirect(`/admin/ages/${age.id}`)
  
  return (
    <div className="pt-5 px-8">
      <AgeForm data={age}/>
    </div>
  )
}
