import { optional, z } from 'zod'

const MAX_FILE_SIZE = 1000000 // 1MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const validateImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(img.src)
      resolve(img.width <= 500 && img.height <= 500)
    }
    img.src = URL.createObjectURL(file)
  })
}

export const createRoomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(5, 'Room name at least have 5 characters'),
  description: z
    .string()
    .min(20, 'Room description  at least have 20 characters'),
  maxGuests: z
    .number()
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests allowed'),
  basePrice: z
    .string()
    .min(1, 'Property price is required')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  totalRoom: z.number().min(1, 'Total room must be a positive number'),
  roomImage: z
    .custom<File>((val) => val instanceof File, {
      message: 'Image is required',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .refine(
      async (file) => await validateImageDimensions(file),
      'Image dimensions must not exceed 500x500 pixels.'
    ),
  roomImageId: z.string().optional(),
  notAvailabilityDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
})

export const createPeakSeasonRates = z.object({
  id: z.string().optional(),
  peakSeasonDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  rateType: z.string(),
  rateValue: z
    .string()
    .min(1, 'Property price is required')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
})

export const PropertyGeneralInfoSchema = z.object({
  propertyName: z.string().min(3, 'Property name at least have 3 characters'),
  propertyCategory: z.string().min(1, 'Property category is required'),
  propertyDescription: z
    .string()
    .min(10, 'Property description at least have 10 characters'),
  propertyFacilities: z
    .array(
      z.string({
        required_error: 'Property category is required',
      })
    )
    .min(1, 'Select at least one facility'),
  guestPlaceType: z.string().min(1, 'Property type is required'),
  propertyImages: z
    .array(
      z.object({
        preview: z.string(),
        path: z.string(),
        publicKey: z.string(),
        isThumbnail: z.boolean(),
      })
    )
    .min(5, 'At least five image is required'),
})

export const PropertyCreateRoomSchema = z.object({
  rooms: z.array(createRoomSchema).min(1, 'Property at least have 1 room'),
})

export const PropertyAddressSchema = z.object({
  propertyAddress: z.string().min(1, 'Property address is required'),
  propertyCity: z.string().min(1, 'Property city is required'),
  propertyProvince: z.string().min(1, 'Property province is required'),
  propertyPostalCode: z.string().min(1, 'Property postal code is required'),
  propertyLatitude: z.string(),
  propertyLongitude: z.string(),
})

export const PropertyCreatePeakSeasonSchema = z.object({
  peakSeasonRate: z.array(createPeakSeasonRates).optional(),
})

export const createPropertySchema = z.object({
  propertyName: z.string().min(3, 'Property name at least have 3 characters'),
  propertyCategory: z.string({
    required_error: 'Property category is required',
  }),
  propertyDescription: z
    .string()
    .min(10, 'Property description at least have 10 characters'),
  propertyFacilities: z
    .array(
      z.string({
        required_error: 'Property category is required',
      })
    )
    .min(1, 'Select at least one facility'),
  propertyImages: z
    .array(z.instanceof(File))
    .min(1, 'At least one image is required'),
  guestPlaceType: z.string({
    required_error: 'Property type is required',
  }),
  propertyAddress: z.string().min(1, 'Property address is required'),
  propertyCity: z.string().min(1, 'Property city is required'),
  propertyProvince: z.string().min(1, 'Property province is required'),
  propertyPostalCode: z.string().min(1, 'Property postal code is required'),
  propertyLatitude: z.string(),
  propertyLongitude: z.string(),
  rooms: z.array(createRoomSchema).min(1, 'Property at least have 1 room'),
  peakSeasonRate: z.array(createPeakSeasonRates).optional(),
  tenantId: z.number({ required_error: 'Tenant id is required' }),
})
