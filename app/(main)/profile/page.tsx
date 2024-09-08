import ChangePassword from './_components/ChangePassword'
import Email from './_components/Email'
import PersonalData from './_components/PersonalData'

const Profile = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-y-10 lg:gap-y-14 px-5 py-14 lg:px-16 lg:py-36'>
      <div className='border border-secondary h-28 w-28'></div>

      <div className='space-y-5 lg:space-y-14'>
        <PersonalData />
        <Email initialEmail='yosef@example.com' isVerified={true} />
        <ChangePassword />
      </div>
    </div>
  )
}
export default Profile
