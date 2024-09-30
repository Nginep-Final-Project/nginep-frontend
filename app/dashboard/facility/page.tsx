'use client'
import { z } from 'zod'
import { toast, useToast } from '@/components/ui/use-toast'
import ItemManagement, { Item } from '../_component/ItemManagement'
import { useEffect, useState } from 'react'
import useFacility from '@/hooks/useFacility'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const facilitySchema = z.object({
  name: z.string({ required_error: 'Facility name is required' }).min(5),
})

const Facility = () => {
  const {
    handleAddFacility,
    handleEditFacility,
    handleDeleteFacility,
    result,
    loading,
    error,
  } = useFacility()
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    if (result) {
      setItems(result)
    }
  }, [result])

  const handleAdd = async (value: string) => {
    const request = {
      value: value,
    }
    const result = await handleAddFacility(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    setItems([...items, result.data])
    toast({
      description: result?.message,
    })
  }

  const handleEdit = async (id: number, newValue: string) => {
    const request = {
      id: id,
      value: newValue,
    }
    const result = await handleEditFacility(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, value: newValue, label: newValue } : item
      )
    )
    toast({
      description: result?.message,
    })
  }

  const handleDelete = async (id: number) => {
    const result = await handleDeleteFacility(id)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    setItems(items.filter((item) => item.id !== id))
    toast({
      description: result?.message,
    })
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <ItemManagement
        schema={facilitySchema}
        itemName='Facility'
        label='Facility Name'
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {loading && <Loading />}
    </>
  )
}

export default Facility
