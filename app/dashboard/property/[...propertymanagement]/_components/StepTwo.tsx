import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import RoomDialog, { RoomFormValues } from './RoomDialog'
import { PropertyCreateRoomSchema } from '@/utils/schema'
import { Progress } from '@/components/ui/progress'
import {
  CREATE_PROPERTY_STEP_ONE,
  CREATE_PROPERTY_STEP_TWO,
} from '@/utils/constanta'
import { PropertyDetail, Room } from '@/types/property'
import usePropertyRoom from '@/hooks/usePropertyRoom'

const StepTwo: React.FC<{
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  propertyData: PropertyDetail
  isEditingMode: boolean
}> = ({ currentStep, setCurrentStep, propertyData, isEditingMode }) => {
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<RoomFormValues | null>(null)
  const [propertyType, setPropertyType] = useState<string>('')
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<z.infer<typeof PropertyCreateRoomSchema>>({
    resolver: zodResolver(PropertyCreateRoomSchema),
    defaultValues: {
      rooms: [],
    },
  })
  const { handleDeletePropertyRoom, loading: loadingPropertyRoom } =
    usePropertyRoom()

  useEffect(() => {
    if (currentStep === 2) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_TWO)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        console.log(parseData)
        reset(parseData)
      }
      const GeneralInfoProperty = sessionStorage.getItem(
        CREATE_PROPERTY_STEP_ONE
      )
      if (GeneralInfoProperty) {
        const parseData = JSON.parse(GeneralInfoProperty)
        setPropertyType(parseData.guestPlaceType)
      }

      if (isEditingMode && propertyData.rooms.length > 0) {
        reset({
          rooms: propertyData.rooms,
        })
      }
    }
  }, [currentStep, propertyData])

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
        { ...room, id: Math.floor(Math.random() * 1000000) },
      ])
    }
    setEditingRoom(null)
    setIsRoomDialogOpen(false)
  }

  const handleEditRoom = (room: RoomFormValues) => {
    setEditingRoom(room)
    setIsRoomDialogOpen(true)
  }

  const handleDeleteRoom = async (id: number) => {
    try {
      if (isEditingMode === true) {
        const result = await handleDeletePropertyRoom(id)
        if (result?.success) {
          const currentRooms = watch('rooms') || []
          setValue(
            'rooms',
            currentRooms.filter((room) => room.id !== id)
          )
        }
        return
      }
      const currentRooms = watch('rooms') || []
      setValue(
        'rooms',
        currentRooms.filter((room) => room.id !== id)
      )
    } catch (error) {
      console.log('Delete room error: ', error)
    }
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
        <div className='min-h-96'>
          <div className='flex gap-x-4 items-center mb-4'>
            <h3 className='font-medium'>Property room</h3>
            <Button
              type='button'
              onClick={() => {
                if (
                  propertyType === 'entire_place' &&
                  watch('rooms').length >= 1
                ) {
                  return
                }
                setIsRoomDialogOpen(true)
              }}
            >
              Add Room
            </Button>
          </div>

          {propertyType === 'entire_place' && (
            <p className='my-4'>
              Property with type entire place can only have 1 room
            </p>
          )}

          {errors.rooms && (
            <p className='text-error mt-1'>{errors.rooms.message}</p>
          )}
          <div className='mt-1 mb-4 flex overflow-x-auto max-w-screen-lg'>
            {watch('rooms')?.map((room) => (
              <Card
                key={room.id}
                className={`flex-shrink-0 w-44 ml-4 lg:ml-0 lg:mr-4 `}
              >
                <CardContent className='p-4 flex flex-col justify-between'>
                  {!room.roomPicture ? (
                    <div>Loading...</div>
                  ) : (
                    <Image
                      src={room.roomPicture}
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
                    IDR {room.basePrice.toLocaleString()} / night
                  </p>
                  <p className='text-xs text-grey-text'>
                    Max guests: {room.maxGuests}
                  </p>
                  <div className='flex justify-between mt-4'>
                    <Button
                      variant='cancel'
                      onClick={() => handleDeleteRoom(room.id!)}
                      className='font-semibold text-primary '
                      type='button'
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEditRoom(room)}
                      className='font-semibold '
                      type='button'
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
        isEditingMode={isEditingMode}
        propertyId={propertyData.id}
      />
    </div>
  )
}
export default StepTwo
