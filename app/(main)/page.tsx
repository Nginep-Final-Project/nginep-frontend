import { auth } from '@/auth'
import Hero from './_components/Hero'

const Home = async () => {
  const session = await auth()
  return (
    <div>
      <Hero />
    </div>
  )
}
export default Home
