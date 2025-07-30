import { prisma } from "@/lib/prisma"
import { CategoriesColumn } from "./components/columns"
import { format } from "date-fns"
import CategoryClient from "./components/client"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategories: CategoriesColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    createdAt: format(category.createdAt, 'MMMM, do yyyy')
  }))
  
  return <CategoryClient data={formattedCategories}/>
}
