import { create } from 'zustand'

interface UseSignUpModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSignUpModal = create<UseSignUpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))