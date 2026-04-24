import PushNotifications from '@pusher/push-notifications-server'
import { NextResponse } from 'next/server'

const instanceId = process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID
const secretKey = process.env.PUSHER_BEAMS_SECRET_KEY

const beamsClient =
  instanceId && secretKey
    ? new PushNotifications({
        instanceId,
        secretKey,
      })
    : null

type NotifyPayload = {
  interests: string[]
  title: string
  body: string
  deepLink?: string
}

export async function POST(request: Request) {
  if (!beamsClient) {
    return NextResponse.json(
      { error: 'Pusher Beams is not configured' },
      { status: 500 }
    )
  }

  const payload = (await request.json()) as NotifyPayload

  if (!payload?.interests?.length || !payload?.title || !payload?.body) {
    return NextResponse.json(
      { error: 'interests, title and body are required' },
      { status: 400 }
    )
  }

  await beamsClient.publishToInterests(payload.interests, {
    web: {
      notification: {
        title: payload.title,
        body: payload.body,
        deep_link: payload.deepLink,
      },
    },
  })

  return NextResponse.json({ status: 200, message: 'Notification queued' })
}
