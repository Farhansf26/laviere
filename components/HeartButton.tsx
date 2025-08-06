'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import useFavorite from "../hooks/useFavorite"
import { User } from "@/lib/generated/prisma"
import { BiLoaderAlt } from "react-icons/bi";

interface HeartButtonProps {
  productId: string
  currentUser?: User | null
  big?: boolean
}

export default function HeartButton({ productId, currentUser, big } : HeartButtonProps) {
  const { hasFavorited, toggleFavorite, isLoading } = useFavorite({ productId, currentUser })
  
  if(isLoading) return <BiLoaderAlt size={big ? 42 : 28} className="animate-spin fill-neutral-500/70"/>

  return (
    <div onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={big ? 46 : 32} className="fill-gray-200 absolute -top-[2px] -right-[2px]"/>
      <AiFillHeart size={big ? 42 : 28} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
    </div>
  )
}
