'use server'
import { signIn, signOut } from '@/auth'

export async function googleSignUp() {
  console.log('google sign up')
  const result = await signIn('google', { redirectTo: '/' })
  console.log('result >>>', result)
}

export async function logout() {
  const result = await signOut()
  console.log('result >>>', result)
}
