'use client'

import { Client } from '@pusher/push-notifications-web'
import { useEffect } from 'react'

export const usePushNotifications = (interest?: string) => {
  useEffect(() => {
    const instanceId = process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID

    if (!instanceId || !interest) {
      return
    }

    const beamsClient = new Client({
      instanceId,
    })

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest(interest))
      .catch((error) => {
        console.error('Pusher Beams registration failed', error)
      })

    return () => {
      beamsClient.stop().catch(() => {
        // Ignore stop errors during unmount in test mode.
      })
    }
  }, [interest])
}
