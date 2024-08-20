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
import { useState } from 'react'
import Login from '@/app/(main)/_components/Login'
import ForgotPassword from '@/app/(main)/_components/ForgotPassword'
import SignupStepOne from '@/app/(main)/_components/SignupStepOne'
import SignupStepTwo from '@/app/(main)/_components/SignupStepTwo'
import EmailVerification from '@/app/(main)/_components/EmailVerification'

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isSignupStepTwo, setIsSignupStepTwo] = useState(false)
  const [isEmailVerification, setIsEmailVerification] = useState(false)

  return (
    <div className='p-4 lg:px-11 lg:py-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-primary'>Nginep</h1>

        <div className='hidden md:flex items-center p-1 lg:p-3 border border-secondary rounded-full lg:w-80 lg:h-14'>
          <input
            // onChange={(e) => debounced(e.target.value)}
            className='px-4 py-[6px] text-sm w-full focus:outline-none'
            type='text'
            placeholder='Search...'
          />
          <div className='bg-primary rounded-full p-2'>
            <Search size={25} color='white' />
          </div>
        </div>

        <div className='flex items-center lg:gap-x-3'>
          <Button variant='ghost' className='hidden md:inline-block'>
            Nginep your property
          </Button>

          <Search
            size={35}
            className='md:hidden px-2'
            onClick={() => setIsSearch(!isSearch)}
          />

          <DropdownMenu onOpenChange={() => setIsSearch(false)}>
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
            <DropdownMenuContent className='border-secondary'>
              <DropdownMenuItem
                onSelect={() => setIsLogin(!isLogin)}
                className='font-semibold'
              >
                Log in
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsSignup(!isSignup)}>
                Sign up
              </DropdownMenuItem>
              <DropdownMenuItem className='font-semibold'>
                Trips
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
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
      {isSearch ? (
        <input
          // onChange={(e) => debounced(e.target.value)}
          className='px-4 py-[6px] text-sm w-full rounded-full border border-secondary focus:outline-none'
          type='text'
          placeholder='Search...'
        />
      ) : null}
    </div>
  )
}
export default Navbar
