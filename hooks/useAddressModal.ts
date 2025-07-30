import { create } from 'zustand'

interface UseAddressModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAddressModal = create<UseAddressModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))