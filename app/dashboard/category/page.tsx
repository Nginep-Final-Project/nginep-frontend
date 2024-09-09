'use client'
import { z } from 'zod'
import ItemManagement from '../_component/ItemManagement'

const categorySchema = z.object({
  name: z.string({ required_error: 'Category name is required' }).min(3),
})

const Category = () => {
  return (
    <ItemManagement
      schema={categorySchema}
      itemName='Category'
      label='Create or edit categories'
      placeholder='Enter category name'
    />
  )
}

export default Category
