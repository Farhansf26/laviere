'use client'

import { Button } from "../ui/button";
import Modal from "../ui/modal";

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  disabled?: boolean;
}

export default function AlertModal({ isOpen, onClose, onDelete, disabled }: AlertModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant='outline'
          onClick={onDelete}
          disabled={disabled}
          className="w-[120px]"
        >
          Cancel
        </Button>
        <Button
          variant='destructive'
          onClick={onDelete}
          disabled={disabled}
          className="w-[120px]"
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
