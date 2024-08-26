import { auth } from '@/auth'

const Home = async () => {
  const session = await auth()
  return <div>Home</div>
}
export default Home
