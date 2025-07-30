import { create } from 'zustand'

interface UseSignInModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSignInModal = create<UseSignInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))