'use client'
import { useToast } from '@/components/ui/use-toast'
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from '@/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onCompleteUserRegistration } from '@/actions/auth'

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const methods = useForm<UserRegistrationProps>({
    // @ts-ignore
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner',
    },
    mode: 'onChange',
  })

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded || !signUp) return

    try {
      await signUp.create({
        emailAddress: email,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      onNext((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.errors?.[0]?.longMessage || 'Something went wrong',
      })
    }
  }

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded || !signUp) return

      try {
        setLoading(true)
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        })

        if (completeSignUp.status !== 'complete') {
          toast({
            title: 'Error',
            description: 'Verification failed',
          })
          setLoading(false)
          return
        }

        if (!completeSignUp.createdUserId) {
          toast({
            title: 'Error',
            description: 'User creation failed',
          })
          setLoading(false)
          return
        }

        const registered = await onCompleteUserRegistration(
          values.fullname,
          completeSignUp.createdUserId,
          values.type
        )

        if (registered?.status === 200 && registered.user) {
          if (completeSignUp.createdSessionId) {
            await setActive({
              session: completeSignUp.createdSessionId,
            })
          }
          setLoading(false)
          router.push('/dashboard')
          return
        }

        toast({
          title: 'Error',
          description: 'Registration failed',
        })
        setLoading(false)
      } catch (error: any) {
        toast({
          title: 'Error',
          description:
            error?.errors?.[0]?.longMessage || 'Something went wrong',
        })
        setLoading(false)
      }
    }
  )
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  }
}