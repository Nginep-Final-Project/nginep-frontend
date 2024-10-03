interface PropertyImage {
  path: string
  publicKey: string
  isThumbnail: boolean
}

interface Room {
  name: string
  description: string
  maxGuests: number
  basePrice: number
  totalRoom: number
  notAvailableDates: Array<{
    from: string
    to: string
  }>
}

interface NotAvailableDates {
  from: string
  to: string
}

interface PeakSeasonRate {
  peakSeasonDates: {
    from: string
    to: string
  }
  rateType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  rateValue: number
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
  PropertyImage,
  Room,
  PeakSeasonRate,
  NotAvailableDates,
}
export { emptyCreateProperty }
