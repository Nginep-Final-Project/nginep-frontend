'use server'
import { signIn, signOut } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'

export async function googleSignUp() {
  await signIn('google')
}

export async function emailSignIn(data: { email: string; password: string }) {
  await signIn('credentials', { ...data, redirect: false })
}

export async function logOutAuth() {
  await signOut({ redirectTo: '/' })
}
