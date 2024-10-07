interface PropertyImage {
  id?: number
  path: string
  publicKey: string
  isThumbnail: boolean
  propertyId?: number
}

interface Room {
  id?: number
  name: string
  description: string
  maxGuests: number
  basePrice: number
  totalRoom: number
  notAvailableDates: Array<{
    from: string
    to: string
  }>
  propertyId?: number
}

interface NotAvailableDates {
  id?: number
  from: string
  to: string
  checkInDate?: string
  checkOutDate?: string
}

interface PeakSeasonRate {
  id?: number
  peakSeasonDates: {
    from: string
    to: string
  }
  rateType: string
  rateValue: number
  propertyId?: number
}

interface CreateProperty {
  propertyName: string
  propertyCategory: string
  propertyDescription: string
  propertyFacilities: string[]
  propertyImage: PropertyImage[]
  guestPlaceType: string
  propertyAddress: string
  propertyCity: string
  propertyProvince: string
  propertyPostalCode: string
  propertyLatitude: number
  propertyLongitude: number
  rooms: Room[]
  peakSeasonRates: PeakSeasonRate[]
  tenantId: number
}

interface EditProperty {
  id: number
  propertyName: string
  propertyCategory: string
  propertyDescription: string
  propertyFacilities: string[]
  propertyImage: PropertyImage[]
  guestPlaceType: string
  propertyAddress: string
  propertyCity: string
  propertyProvince: string
  propertyPostalCode: string
  propertyLatitude: number
  propertyLongitude: number
  rooms: Room[]
  peakSeasonRates: PeakSeasonRate[]
}

// Empty initial value
const emptyCreateProperty: CreateProperty = {
  propertyName: '',
  propertyCategory: '',
  propertyDescription: '',
  propertyFacilities: [],
  propertyImage: [],
  guestPlaceType: '',
  propertyAddress: '',
  propertyCity: '',
  propertyProvince: '',
  propertyPostalCode: '',
  propertyLatitude: 0,
  propertyLongitude: 0,
  rooms: [],
  peakSeasonRates: [],
  tenantId: 0,
}

export type {
  CreateProperty,
  EditProperty,
  PropertyImage,
  Room,
  PeakSeasonRate,
  NotAvailableDates,
}
export { emptyCreateProperty }
