'use client'

import { redirect, usePathname } from "next/navigation"

export default function AdminPage() {
  const pathname = usePathname()

  if(pathname === '/admin') redirect('/admin/dashboard')

  return null
}
