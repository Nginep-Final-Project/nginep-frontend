'use client'
import useProfile from '@/hooks/useProfile'
import AboutYourself from './_components/AboutYourself'
import BankAccount from './_components/BankAccount'
import ChangePassword from './_components/ChangePassword'
import Email from './_components/Email'
import Languages from './_components/Languages'
import PersonalData from './_components/PersonalData'
import ProfileImage from './_components/ProfileImage'
import PropertyRules from './_components/PropertyRules'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const Profile = () => {
  const { result, loading, error } = useProfile()

  if (error) {
    return <Error />
  }

  return (
    <>
      <div className='grid lg:grid-cols-2 gap-y-10 lg:gap-y-14 px-5 py-14 lg:px-16 lg:py-36'>
        <div className='lg:w-1/2 lg:justify-self-center'>
          <ProfileImage
            initImage={
              result.profilePicture
                ? result.profilePicture
                : 'https://res.cloudinary.com/dhbg53ncx/image/upload/v1724048239/y2v5dowacq3zuvraaeem.png'
            }
            picturePublicId={result.picturePublicId}
            role={result.role}
          />
        </div>

        <div className='space-y-5 lg:space-y-14'>
          <PersonalData
            initName={result.fullName}
            initGender={result.gender}
            initDateOfBirth={result.dateOfBirth}
            initPhone={result.phoneNumber}
          />
          {result.accountType === 'email' && (
            <>
              <Email
                name={result.fullName}
                initialEmail={result.email}
                isVerified={result.isVerified}
              />
              <ChangePassword />
            </>
          )}

          <AboutYourself initialValue={result.aboutYourself} />
          <Languages props={result.languages} />
          <BankAccount
            initBankName={result.bankName}
            initAccNumber={result.bankAccountNumber}
            initHolderName={result.bankHolderName}
          />
          <PropertyRules
            initCheckin={result.checkinTime}
            initCheckout={result.checkoutTime}
            initCancelPolicy={result.cancelPolicy}
          />
        </div>
      </div>
      {loading && <Loading />}
    </>
  )
}
export default Profile
