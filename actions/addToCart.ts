// import { Product } from "@/lib/generated/prisma"
// import { prisma } from "@/lib/prisma"

// export const addToCart = async ({ userId, product }: { userId: string, product: Product }) => {
//   const currentUser = await prisma.user.findFirst({
//     where: {
//       id: userId
//     },
//     include: {
//       cartItems:
//     }
//   })
  
//   const cart = await prisma.user.update({
//     where: {
//       id: userId
//     },
//     data: {
//       cartItems: {
//         create: {
//           quantity:
//         }
//       }
//     }
//   })
// }