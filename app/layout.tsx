import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import QueryClientProvider from '@/components/QueryClientProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <SessionProvider session={session} refetchInterval={5}>
          <QueryClientProvider>{children}</QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
