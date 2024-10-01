import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import RenderField from './RenderField'
import Select from '@/components/Select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import RoomDialog, { RoomFormValues } from './RoomDialog'
import { PropertyCreateRoomSchema } from '@/utils/schema'
import { Progress } from '@/components/ui/progress'
import { CREATE_PROPERTY_STEP_TWO } from '@/utils/constanta'

const StepTwo: React.FC<{
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}> = ({ currentStep, setCurrentStep }) => {
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<RoomFormValues | null>(null)
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<z.infer<typeof PropertyCreateRoomSchema>>({
    resolver: zodResolver(PropertyCreateRoomSchema),
  })

  useEffect(() => {
    if (currentStep === 2) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_TWO)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        console.log(parseData)
        reset(parseData)
      }
    }
  }, [currentStep, reset])

  const handleSaveRoom = (room: RoomFormValues) => {
    const currentRooms = watch('rooms') || []
    if (editingRoom) {
      setValue(
        'rooms',
        currentRooms.map((r) =>
          r.id === editingRoom.id ? { ...room, id: editingRoom.id } : r
        )
      )
    } else {
      setValue('rooms', [
        ...currentRooms,
        { ...room, id: Date.now().toString() },
      ])
    }
    setEditingRoom(null)
    setIsRoomDialogOpen(false)
  }

  const handleEditRoom = (room: RoomFormValues) => {
    setEditingRoom(room)
    setIsRoomDialogOpen(true)
  }

  const handleDeleteRoom = (id: string) => {
    const currentRooms = watch('rooms') || []
    setValue(
      'rooms',
      currentRooms.filter((room) => room.id !== id)
    )
  }

  const onSubmit = (data: z.infer<typeof PropertyCreateRoomSchema>) => {
    console.log('submit')
    console.log(data)
    setCurrentStep(3)
    sessionStorage.setItem(CREATE_PROPERTY_STEP_TWO, JSON.stringify(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='flex gap-x-4 items-center'>
            <h3 className='text-sm font-medium'>Property room</h3>
            <Button type='button' onClick={() => setIsRoomDialogOpen(true)}>
              Add Room
            </Button>
          </div>

          {errors.rooms && (
            <p className='text-red-500 mt-1'>{errors.rooms.message}</p>
          )}
          <div className='mt-1 mb-4 space-y-4'>
            {watch('rooms')?.map((room) => (
              <Card
                key={room.id}
                className={`flex-shrink-0 w-44 ml-4 lg:ml-0 lg:mr-4 `}
              >
                <CardContent className='p-4 flex flex-col justify-center'>
                  {!room.roomImage ? (
                    <div>Loading...</div>
                  ) : (
                    <Image
                      src={URL.createObjectURL(room.roomImage)}
                      alt={room.name}
                      height={150}
                      width={150}
                      style={{ height: '150px', width: '150px' }}
                      className='h-[150px] w-[150px] object-cover rounded-md mb-2'
                    />
                  )}

                  <h3 className='font-semibold'>{room.name}</h3>
                  <p className='text-sm text-grey-text whitespace-pre-wrap break-words line-clamp-2'>
                    {room.description}
                  </p>

                  <p className='font-bold mt-2'>
                    Rp {room.basePrice.toLocaleString()} / night
                  </p>
                  <p className='text-xs text-grey-text'>
                    Max guests: {room.maxGuests}
                  </p>
                  <div className='flex justify-between mt-4'>
                    <Button
                      variant='cancel'
                      onClick={() => handleDeleteRoom(room.id!)}
                      className='font-semibold text-primary '
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEditRoom(room)}
                      className='font-semibold '
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
          <Button
            variant='cancel'
            type='button'
            onClick={() => {
              setCurrentStep(1)
            }}
          >
            Back
          </Button>
          <Progress value={(2 / 4) * 100} className='flex-grow h-2' />
          <Button type='submit'>Next</Button>
        </div>
      </form>
      <RoomDialog
        open={isRoomDialogOpen}
        onOpenChange={setIsRoomDialogOpen}
        onSave={handleSaveRoom}
        initialRoom={editingRoom}
      />
    </div>
  )
}
export default StepTwo
