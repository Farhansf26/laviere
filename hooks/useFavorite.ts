import { User } from '@/lib/generated/prisma'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useSignInModal } from './useSignInModal'

interface IUseFavorite {
  productId: string
  currentUser?: User | null
}

const useFavorite = ({ productId, currentUser } : IUseFavorite) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const signInModal = useSignInModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(productId)
  }, [currentUser, productId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) {
      signInModal.onOpen()
      toast.error('Silahkan login terlebih dahulu!')
      return
    }
    
      try {
      setIsLoading(true)
      let request;

      if(hasFavorited) {
        request = () => axios.delete(`/api/favorites/${productId}`)
        toast.success('Removed from favorite')
      } else {
        request = () => axios.post(`/api/favorites/${productId}`)
        toast.success('Added to favorite')
      }

      await request()
      router.refresh()
    } catch (error: unknown) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }, [currentUser, hasFavorited, productId, signInModal, router])

  return {
    hasFavorited,
    toggleFavorite,
    isLoading
  }
}

export default useFavorite