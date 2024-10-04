'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Menu, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useEffect, useState } from 'react'
import Login from '@/app/(main)/_components/Login'
import ForgotPassword from '@/app/(main)/_components/ForgotPassword'
import SignupStepOne from '@/app/(main)/_components/SignupStepOne'
import SignupStepTwo from '@/app/(main)/_components/SignupStepTwo'
import EmailVerification from '@/app/(main)/_components/EmailVerification'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useLogout from '@/hooks/useLogout'
import { toast } from './ui/use-toast'
import { logOutAuth } from '@/actions/auth'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isSignupStepTwo, setIsSignupStepTwo] = useState(false)
  const [isEmailVerification, setIsEmailVerification] = useState(false)

  const router = useRouter()
  const session = useSession({
    onUnauthenticated() {
      setIsAuthenticated(false)
    },
    required: true,
  })
  const { handleLogOut } = useLogout()

  const logOut = async () => {
    const result = await handleLogOut()
    if (!result?.success) {
      toast({
        title: 'Login failed',
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    logOutAuth()
      .then(() => {
        toast({
          title: result?.message,
        })
      })
      .catch((error) => {
        toast({
          title: 'Login failed',
          variant: 'destructive',
          description: error,
        })
      })
    router.refresh()
  }

  return (
    <div className='p-4 lg:px-11 lg:py-5'>
      <div className='flex items-center justify-between'>
        <h1
          className='text-2xl font-bold text-primary'
          onClick={() => {
            router.push('/')
          }}
        >
          Nginep
        </h1>

        <div className='flex items-center lg:gap-x-3'>
          <Button
            variant='ghost'
            className='hidden md:inline-block'
            type='button'
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            Nginep your property
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='hidden md:flex items-center px-4 h-[55px] gap-x-3 border rounded-full border-secondary'>
                <Menu size={25} />
                <Avatar>
                  <AvatarImage src='https://res.cloudinary.com/dhbg53ncx/image/upload/v1724048239/y2v5dowacq3zuvraaeem.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <Menu size={40} className='md:hidden px-2' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-secondary bg-white'>
              {!session.data?.user.accessToken && (
                <>
                  <DropdownMenuItem
                    onSelect={() => setIsLogin(!isLogin)}
                    className='font-semibold'
                  >
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsSignup(!isSignup)}>
                    Sign up
                  </DropdownMenuItem>
                </>
              )}

              {session.data?.user.accessToken && (
                <>
                  <DropdownMenuItem
                    className='font-semibold'
                    onClick={() => {
                      router.push('/user/bookings')
                    }}
                  >
                    Trips
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/profile')
                    }}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={logOut}>Log out</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Login
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isForgotPassword={() => {
          setIsLogin(false)
          setIsForgotPassword(!isForgotPassword)
        }}
      />
      <SignupStepOne
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        setRegister={() => {
          setIsSignup(false)
          setIsSignupStepTwo(!isSignupStepTwo)
        }}
      />
      <SignupStepTwo
        isSignupStepTwo={isSignupStepTwo}
        setIsSignupStepTwo={setIsSignupStepTwo}
        setEmailVerification={() => {
          setIsSignupStepTwo(false)
          setIsEmailVerification(!isEmailVerification)
        }}
      />
      <EmailVerification
        isEmailVerification={isEmailVerification}
        setIsEmailVerification={setIsEmailVerification}
      />
      <ForgotPassword
        isForgotPassword={isForgotPassword}
        setIsForgotPassword={setIsForgotPassword}
      />
    </div>
  )
}
export default Navbar
