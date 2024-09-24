'use server'
import { signIn, signOut } from '@/auth'

export async function googleSignUp() {
  await signIn('google')
}

export async function emailSignIn(data: { email: string; password: string }) {
  await signIn('credentials', data, { redirectTo: '/' })
}

export async function logOutAuth() {
  await signOut({ redirectTo: '/' })
}
