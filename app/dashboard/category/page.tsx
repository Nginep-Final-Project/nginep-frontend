'use client'
import { z } from 'zod'
import ItemManagement, { Item } from '../_component/ItemManagement'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import useCategory from '@/hooks/useCategory'

const categorySchema = z.object({
  name: z.string({ required_error: 'Category name is required' }).min(3),
})

const Category = () => {
  const {
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    result,
    loading,
    error,
  } = useCategory()
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
    const result = await handleAddCategory(request)
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
    const result = await handleEditCategory(request)
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
    const result = await handleDeleteCategory(id)
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
        schema={categorySchema}
        itemName='Category'
        label='Category Name'
        items={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {loading && <Loading />}
    </>
  )
}

export default Category
