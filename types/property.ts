export interface PropertyData {
  categories: Category[]
  properties: Properties
  cities: City[]
}

export interface Category {
  id: number
  value: string
  label: string
}

export interface Properties {
  totalPages: number
  totalElements: number
  size: number
  content: Property[]
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  last: boolean
  pageable: Pageable
  empty: boolean
}

export interface City {
  value: string
  label: string
}

export interface Property {
  id: number
  propertyName: string
  propertyCategory: string
  propertyImage: PropertyImage[]
  propertyAddress: string
  propertyCity: string
  propertyProvince: string
  rooms: Room[]
  rating: number
}

export interface PropertyImage {
  id: number
  path: string
  publicKey: string
  propertyId: number
  isThumbnail: boolean
}

export interface Room {
  id: number
  name: string
  description: string
  maxGuests: number
  basePrice: number
  totalRoom: number
  booking: Booking[]
}

export interface Booking {
  id: number
  checkInDate: string
  checkOutDate: string
  finalPrice: number
  numGuests: number
  status: string
  userMessage: string | null
  createdAt: string
  updatedAt: string
}

export interface Sort {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}

export const emptyPropertyData: PropertyData = {
  categories: [],
  properties: {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    sort: {
      empty: false,
      unsorted: false,
      sorted: false,
    },
    numberOfElements: 0,
    first: false,
    last: false,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: false,
        unsorted: false,
        sorted: false,
      },
      offset: 0,
      unpaged: false,
      paged: false,
    },
    empty: false,
  },
  cities: [],
}
