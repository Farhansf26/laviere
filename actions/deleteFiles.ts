'use server'

import { prisma } from "@/lib/prisma"
import { utapi } from "@/server/uploadthing"

export const deleteFiles = async(image: any[]) => {
  await prisma.image.deleteMany({
    where: {
      url: {
        in: [...image.map((image) => image.url)]
      }
    }
  })

  await utapi.deleteFiles(image.map((item) => item.key))
}