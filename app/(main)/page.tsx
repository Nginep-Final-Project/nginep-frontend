import { auth } from '@/auth'

const Home = async () => {
  const session = await auth()
  console.log('session >>>>', session)

  return <div>Home</div>
}
export default Home
