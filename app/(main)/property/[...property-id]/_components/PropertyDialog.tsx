import ImageCarousel from '@/components/ImageCarousel'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import React, { useState } from 'react'

const PropertyDialog: React.FC<{
  content: React.ReactNode
  itemName: string
}> = ({ content, itemName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='p-2 bg-white rounded-lg '>
            Show all {itemName}
          </Button>
        </DialogTrigger>

        <DialogContent className='bg-white p-8 flex flex-col items-center'>
          {content}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default PropertyDialog
