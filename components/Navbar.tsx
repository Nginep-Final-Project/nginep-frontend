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

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

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
          <Button className='rounded-full'>
            <Search size={20} color='white' />
          </Button>
        </div>

        <div className='flex items-center lg:gap-x-3'>
          <Button variant='ghost' className='hidden md:inline-block'>
            Nginep your property
          </Button>
          <Button
            variant='ghost'
            className='md:hidden px-2'
            type='button'
            onClick={() => setIsSearch(!isSearch)}
          >
            <Search size={20} />
          </Button>
          <DropdownMenu onOpenChange={() => setIsSearch(false)}>
            <DropdownMenuTrigger>
              <Button
                variant='outline'
                className='hidden md:flex h-[55px] gap-x-3 border-secondary'
                type='button'
              >
                <Menu size={25} />
                <Avatar>
                  <AvatarImage src='https://res.cloudinary.com/dhbg53ncx/image/upload/v1724048239/y2v5dowacq3zuvraaeem.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
              <Button variant='ghost' className='md:hidden px-2'>
                <Menu size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-secondary'>
              <DropdownMenuItem
                onSelect={() => setIsLogin(!isLogin)}
                className='font-semibold'
              >
                Log in
              </DropdownMenuItem>
              <DropdownMenuItem>Sign up</DropdownMenuItem>
              <DropdownMenuItem className='font-semibold'>
                Trips
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      {isSearch ? (
        <div className='lg:hidden items-center p-1 lg:p-3 border border-secondary rounded-full lg:w-80 lg:h-14'>
          <input
            // onChange={(e) => debounced(e.target.value)}
            className='px-4 py-[6px] text-sm w-full focus:outline-none'
            type='text'
            placeholder='Search...'
          />
        </div>
      ) : null}
    </div>
  )
}
export default Navbar
