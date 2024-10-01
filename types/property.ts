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

export interface PropertyDetail {
  id: number
  propertyName: string
  propertyCategory: string
  propertyDescription: string
  propertyFacilities: Facility[]
  propertyImage: PropertyImage[]
  guestPlaceType: string
  propertyAddress: string
  propertyCity: string
  propertyProvince: string
  propertyPostalCode: string
  propertyLatitude: number
  propertyLongitude: number
  rooms: Room[]
  peakSeasonRate: PeakSeasonRate[]
  reviewSummary: ReviewSummary
  reviewList: ReviewItem[]
  tenant: Tenant
}

export interface Facility {
  id: number
  value: string
  propertyId: number
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
  roomPicture: string
  roomPictureId: string | null
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

export interface PeakSeasonRate {
  id: number
  peakSeasonDates: {
    from: string
    to: string
  }
  rateType: string
  rateValue: number
}

export interface ReviewSummary {
  averageRating: number
  totalReviews: number
  cleanlinessRating: number
  communicationRating: number
  checkInRating: number
  accuracyRating: number
  locationRating: number
  valueRating: number
}

export interface ReviewItem {
  id: number
  bookingId: number
  propertyName: string
  userPicture: string
  fullName: string
  cleanlinessRating: number
  communicationRating: number
  checkInRating: number
  accuracyRating: number
  locationRating: number
  valueRating: number
  comment: string
  averageRating: number
  createdAt: string
  reply: string | null
}

export interface Tenant {
  id: number
  fullName: string
  email: string
  profilePicture: string
  picturePublicId: string
  isVerified: boolean
  role: string
  languages: Languages[]
  accountType: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  aboutYourself: string
  checkinTime: string
  checkoutTime: string
  cancelPolicy: string
  bankName: string
  bankAccountNumber: string
  bankHolderName: string
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}

export interface Languages {
  id: number
  languageName: string
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

export const initialPropertyDetail: PropertyDetail = {
  id: 0,
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
  rooms: [
    {
      id: 0,
      roomPicture: '',
      roomPictureId: '',
      name: '',
      description: '',
      maxGuests: 0,
      basePrice: 0,
      totalRoom: 0,
      booking: [],
    },
  ],
  peakSeasonRate: [],
  reviewSummary: {
    averageRating: 0,
    totalReviews: 0,
    cleanlinessRating: 0,
    communicationRating: 0,
    checkInRating: 0,
    accuracyRating: 0,
    locationRating: 0,
    valueRating: 0,
  },
  reviewList: [],
  tenant: {
    id: 0,
    fullName: '',
    email: '',
    profilePicture: '',
    picturePublicId: '',
    isVerified: false,
    role: '',
    languages: [],
    accountType: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    aboutYourself: '',
    checkinTime: '',
    checkoutTime: '',
    cancelPolicy: '',
    bankName: '',
    bankAccountNumber: '',
    bankHolderName: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  },
}
