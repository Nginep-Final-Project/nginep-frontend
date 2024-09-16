import AboutYourself from './_components/AboutYourself'
import BankAccount from './_components/BankAccount'
import ChangePassword from './_components/ChangePassword'
import Email from './_components/Email'
import Languages from './_components/Languages'
import PersonalData from './_components/PersonalData'
import ProfileImage from './_components/ProfileImage'
import PropertyRules from './_components/PropertyRules'

const Profile = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-y-10 lg:gap-y-14 px-5 py-14 lg:px-16 lg:py-36'>
      <div>
        <ProfileImage
          initImage={
            'https://res.cloudinary.com/dhbg53ncx/image/upload/v1724048239/y2v5dowacq3zuvraaeem.png'
          }
          initName={'John'}
          picturePublicId={'qyejckmz0gnfzhuupfpi'}
          role={'Guest'}
        />
      </div>

      <div className='space-y-5 lg:space-y-14'>
        <PersonalData />
        <Email initialEmail='yosef@example.com' isVerified={true} />
        <ChangePassword />
        <AboutYourself initialValue={''} />
        <Languages />
        <BankAccount initBankName={''} initAccNumber={''} initHolderName={''} />
        <PropertyRules
          initCheckin={''}
          initCheckout={''}
          initCancelPolicy={''}
        />
      </div>
    </div>
  )
}
export default Profile
