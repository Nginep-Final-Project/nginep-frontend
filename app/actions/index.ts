'use server'
import { signIn, signOut } from '@/auth'
import { toast } from '@/components/ui/use-toast'

export async function googleSignUp() {
  console.log('google sign up')
  const result = await signIn('google', { redirectTo: '/' })
  console.log('result >>>', result)
}

export async function emailSignIn(data: { email: string; password: string }) {
  console.log('email sign in')
  await signIn('credentials', data)
}

export async function logout() {
  try {
    await signOut()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )
    console.log(response)
    if (!response.ok) {
      throw new Error('Logout failed')
    }
    const data = await response.json()
    await signOut()
    toast({
      title: data.message,
    })
  } catch (error) {
    console.error('Logout error:', error)
  }
}
