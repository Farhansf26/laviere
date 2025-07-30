import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import CategoryForm from "./components/CategoryForm"
import { ObjectId } from 'mongodb'

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = await params
  const categoryIdPrefix = categoryId.slice(0, 24)

  let category;

  if(ObjectId.isValid(categoryIdPrefix)) {
    category = await prisma.category.findFirst({
      where: {
        id: categoryIdPrefix
      },
      include: {
        images: true
      }
    })
  }

  if(!category && categoryId != 'new') redirect('/admin/categories/new')
  if(category && categoryId !== category.id) redirect(`/admin/categories/${category.id}`)
  
  return (
    <div className="pt-5 px-8">
      <CategoryForm data={category}/>
    </div>
  )
}
