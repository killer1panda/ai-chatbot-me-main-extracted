import { useToast } from '@/components/ui/use-toast'
import { UserLoginProps, UserLoginSchema } from '@/schema/auth.schema'
import { useSignIn } from '@clerk/nextjs/legacy'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const withTimeout = async <T>(promise: Promise<T>, timeoutMs = 15000) => {
  return await Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('CLERK_TIMEOUT')), timeoutMs)
    }),
  ])
}

export const useSignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const methods = useForm<UserLoginProps>({
    // @ts-ignore
    resolver: zodResolver(UserLoginSchema),
    mode: 'onChange',
  })
  const onHandleSubmit = methods.handleSubmit(
    // @ts-ignore Type mismatch due to Zod resolver inference
    async (values: UserLoginProps) => {
      if (!isLoaded || !signIn || !setActive) {
        toast({
          title: 'Please wait',
          description: 'Authentication is still loading. Try again in a moment.',
        })
        return
      }

      try {
        setLoading(true)
        const authenticated: any = await withTimeout(
          signIn.create({
          identifier: values.email,
          password: values.password,
          })
        )

        if (authenticated.status === 'complete') {
          await setActive({ session: authenticated.createdSessionId })
          toast({
            title: 'Success',
            description: 'Welcome back!',
          })
          router.push('/conversation')
          return
        }

        if (authenticated.status === 'needs_second_factor') {
          toast({
            title: 'Verification required',
            description:
              'Your account has 2-factor auth enabled. Complete second-factor verification in Clerk to continue.',
          })
          setLoading(false)
          return
        }
      } catch (error: any) {
        const rawMessage =
          error?.message || error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message
        const isTimeout = rawMessage === 'CLERK_TIMEOUT'
        const code = error?.errors?.[0]?.code

        if (code === 'form_password_incorrect')
          toast({
            title: 'Error',
            description: 'email/password is incorrect try again',
          })
        else if (isTimeout)
          toast({
            title: 'Auth timeout',
            description:
              'Clerk did not respond in time. Check your internet or Clerk configuration and try again.',
          })
        else
          toast({
            title: 'Error',
            description:
              error?.errors?.[0]?.longMessage ||
              error?.errors?.[0]?.message ||
              'Sign in failed. Please try again.',
          })
      } finally {
        setLoading(false)
      }
    }
  )

  return {
    methods,
    onHandleSubmit,
    loading,
  }
}