import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface GuestDialogProps {
  open: boolean
  onClose: () => void
  onChange: (value: number) => void
}

const GuestDialog: React.FC<GuestDialogProps> = ({
  open,
  onClose,
  onChange,
}) => {
  const [guest, setGuest] = useState<number>(1)

  const handleSubmit = () => {
    onChange(guest)
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[320px] bg-white'>
        <DialogHeader>
          <DialogTitle>Guest</DialogTitle>
          <DialogDescription>
            Input total guests and click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <input
            type='number'
            min={0}
            value={guest}
            onChange={(e) => {
              setGuest(Number(e.target.value))
            }}
            className='border border-secondary w-full p-2 rounded-md'
          />
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default GuestDialog
