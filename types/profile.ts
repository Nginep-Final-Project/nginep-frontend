export interface UserProfile {
  id: number
  fullName: string
  email: string
  profilePicture: string
  picturePublicId: string
  isVerified: boolean
  dateOfBirth: string
  role: string
  accountType: string
  gender: string
  phoneNumber: string
  languages: {
    id: number
    languageName: string
  }[]
  aboutYourself: string
  checkinTime: string
  checkoutTime: string
  cancelPolicy: string
  bankName: string
  bankAccountNumber: string
  bankHolderName: string
}

export interface Email {
  email: string
}

export interface password {
  password: string
}

export interface PersonalData {
  fullName: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
}

export interface AboutYourself {
  aboutYourself: string
}

export interface BankAccount {
  bankName: string
  bankAccountNumber: string
  bankHolderName: string
}

export interface PropertyRules {
  checkinTime: string
  checkoutTime: string
  cancelPolicy: string
}

export const initialUserProfile: UserProfile = {
  id: 0,
  fullName: '',
  email: '',
  profilePicture: '',
  picturePublicId: '',
  isVerified: false,
  dateOfBirth: '',
  role: '',
  accountType: '',
  gender: '',
  phoneNumber: '',
  languages: [],
  aboutYourself: '',
  checkinTime: '',
  checkoutTime: '',
  cancelPolicy: '',
  bankName: '',
  bankAccountNumber: '',
  bankHolderName: '',
}
