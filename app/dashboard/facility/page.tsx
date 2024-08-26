'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Delete from '@/public/delete.svg'
import Edit from '@/public/pencil.svg'
import { useToast } from '@/components/ui/use-toast'
import ItemManagement from '../_component/ItemManagement'

interface facility {
  id: number
  facility: string
}

const facilitySchema = z.object({
  name: z.string({ required_error: 'Facility name is required' }).min(5),
})

type FormData = z.infer<typeof facilitySchema>

const Facility = () => {
  // const [facilities, setFacilities] = useState<facility[]>([])
  // const [isEditing, setIsEditing] = useState<boolean>(false)
  // const [currentFacilityId, setCurrentFacilityId] = useState<number | null>(
  //   null
  // )
  // const { toast } = useToast()

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   setValue,
  // } = useForm<FormData>({
  //   resolver: zodResolver(facilitySchema),
  // })

  // const onSubmit = (data: FormData) => {
  //   const facilityExists = facilities.some(
  //     (f) => f.facility.toLowerCase() === data.facility.toLowerCase()
  //   )

  //   if (facilityExists) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'Facility already exists!',
  //     })
  //     return
  //   }

  //   if (isEditing && currentFacilityId !== null) {
  //     // Edit existing facility
  //     const updatedFacilities = facilities.map((f) =>
  //       f.id === currentFacilityId ? { ...f, facility: data.facility } : f
  //     )
  //     setFacilities(updatedFacilities)
  //     setIsEditing(false)
  //     setCurrentFacilityId(null)
  //   } else {
  //     // Add new facility
  //     const newFacility: facility = {
  //       id:
  //         facilities.length > 0 ? facilities[facilities.length - 1].id + 1 : 0,
  //       facility: data.facility,
  //     }
  //     setFacilities([...facilities, newFacility])
  //   }
  //   reset()
  // }

  // const handleEdit = (id: number) => {
  //   const facilityToEdit = facilities.find((f) => f.id === id)
  //   if (facilityToEdit) {
  //     setValue('facility', facilityToEdit.facility)
  //     setIsEditing(true)
  //     setCurrentFacilityId(id)
  //   }
  // }

  // const handleDelete = (id: number) => {
  //   const updatedFacilities = facilities.filter((f) => f.id !== id)
  //   setFacilities(updatedFacilities)
  // }

  return (
    // <div className='flex flex-col items-center py-4 md:py-32'>
    //   <div className='w-1/2'>
    //     <h2 className='font-semibold text-2xl mb-4 text-center'>
    //       Facilities Management
    //     </h2>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Input
    //         name='facility'
    //         label='Create or edit facilities'
    //         type='text'
    //         register={register}
    //         errors={errors}
    //       />

    //       <div className='flex justify-end space-x-4 w-full'>
    //         <Button
    //           variant='cancel'
    //           className='p-3 rounded-2xl font-semibold text-xl'
    //           type='button'
    //           onClick={() => {
    //             reset()
    //           }}
    //         >
    //           Cancel
    //         </Button>

    //         <Button
    //           type='submit'
    //           className='text-white p-3 rounded-2xl font-semibold text-xl'
    //         >
    //           Save
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    //   <div className='w-1/2 mt-8'>
    //     <h2 className='font-semibold text-2xl mb-4 text-center'>
    //       Facilities List
    //     </h2>
    //     <div className='flex flex-wrap gap-3'>
    //       {facilities.map((e) => {
    //         return (
    //           <Button
    //             key={e.id}
    //             variant='outline'
    //             className='flex gap-3'
    //             type='button'
    //           >
    //             {e.facility}
    //             <Image
    //               src={Delete}
    //               alt='delete'
    //               onClick={() => handleDelete(e.id)}
    //             />
    //             <Image src={Edit} alt='Edit' onClick={() => handleEdit(e.id)} />
    //           </Button>
    //         )
    //       })}
    //     </div>
    //   </div>
    // </div>
    <ItemManagement
      schema={facilitySchema}
      itemName='Facility'
      label='Create or edit facilities'
      placeholder='Enter facility name'
    />
  )
}

export default Facility
