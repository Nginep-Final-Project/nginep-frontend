import { Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from './ui/button'

const Footer = () => {
  return (
    <div className='bg-secondary w-full px-4 md:px-10'>
      <div className='grid md:grid-cols-4 gap-6 py-8 md:py-10 border-b-2 border-grey-text'>
        {[
          {
            title: 'Support',
            items: [
              'Help Center',
              'NgCover',
              'Supporting people with disabilities',
              'Cancellation options',
            ],
          },
          {
            title: 'Community',
            items: ['Nginep.org'],
          },
          {
            title: 'Hosting',
            items: [
              'Nginep your home',
              'Explore hosting resources',
              'Visit community forum',
            ],
          },
          {
            title: 'Nginep',
            items: [
              'Newsroom',
              'About new features',
              'Letter from our founders',
              'Careers',
              'Investors',
            ],
          },
        ].map((section) => (
          <div key={section.title} className='flex flex-col items-start'>
            <h3 className='text-sm font-semibold mb-2'>{section.title}</h3>
            <div className='flex flex-col items-start w-full'>
              {section.items.map((item) => (
                <Button
                  key={item}
                  variant='ghost'
                  className='p-0 text-sm font-normal text-start whitespace-normal'
                  type='button'
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex space-x-4 mb-4 md:mb-0'>
            <Button variant='ghost' size='icon'>
              <Facebook className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon'>
              <Twitter className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon'>
              <Instagram className='h-5 w-5' />
            </Button>
          </div>
          <div className='text-sm text-gray-500'>
            © 2024 Nginep, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
