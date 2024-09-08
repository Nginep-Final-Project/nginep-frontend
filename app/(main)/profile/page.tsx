import Email from './_components/Email'
import PersonalData from './_components/PersonalData'

const Profile = () => {
  return (
    <div>
      <PersonalData />
      <Email initialEmail='yosef@example.com' isVerified={true} />
    </div>
  )
}
export default Profile
