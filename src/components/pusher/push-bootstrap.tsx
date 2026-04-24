'use client'

import { useUser } from '@clerk/nextjs'
import { usePushNotifications } from '@/hooks/use-push-notifications'

const PushBootstrap = () => {
  const { user } = useUser()
  const interest = user?.id ? `user-${user.id}` : undefined

  usePushNotifications(interest)

  return null
}

export default PushBootstrap
