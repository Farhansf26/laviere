'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

interface ModalProps {
  title: string
  description: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  const handleOpen = (open: boolean) => {
    if(!open) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => handleOpen(open)}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
