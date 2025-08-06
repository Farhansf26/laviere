'use client'

import { User } from "@/lib/generated/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { User2, UserCog } from "lucide-react"
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation"
import { signOut } from 'next-auth/react'
import { useEffect, useState } from "react"
import { PiNotepad } from "react-icons/pi"
import { IoHeartOutline } from "react-icons/io5"

interface UserMenuProps {
  currentUser?: User | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const [isMounted, setIsMounted] = useState(false);

  const fallbackUserName = currentUser?.name?.split(' ')
  const splitUsername = fallbackUserName?.map((item) => item.split('')[0])

  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer hover:shadow-xl hover:opacity-90 transition">
        <Avatar>
          {currentUser?.image && <AvatarImage src={currentUser.image}/>}
          <AvatarFallback className="border border-gray-400/55">
            {splitUsername && <>{splitUsername[0].toUpperCase()}{splitUsername.length > 1 && splitUsername[1]?.toUpperCase()}</>}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-[180px] space-y-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push('/profile')}>
          Profile <User2 className="ml-auto"/>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push('/favorites')}>
          My Favorites <IoHeartOutline className="ml-auto"/>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push('/orders')}>
          My Orders <PiNotepad className="ml-auto"/>
        </DropdownMenuItem>
        {currentUser?.role === 'ADMIN' && (
          <DropdownMenuItem onSelect={() => router.push('/admin/dashboard')}>
            Dashboard <UserCog className="ml-auto"/>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="bg-red-500 text-white hover:!bg-red-400 hover:!text-white 
          transition duration-75"  
          onSelect={() => signOut()}
        >
          Log Out
          <IoMdLogOut className='ml-auto' color="white"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
