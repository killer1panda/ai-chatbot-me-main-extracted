import { pusherServer } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!pusherServer) {
    return NextResponse.json(
      { error: 'Pusher Channels is not configured' },
      { status: 500 }
    )
  }

  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const socketId = body?.socket_id as string | undefined
  const channelName = body?.channel_name as string | undefined

  if (!socketId || !channelName) {
    return NextResponse.json(
      { error: 'socket_id and channel_name are required' },
      { status: 400 }
    )
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channelName, {
    user_id: user.id,
    user_info: {
      name: user.fullName || user.username || user.id,
      email: user.emailAddresses[0]?.emailAddress,
    },
  })

  return NextResponse.json(authResponse)
}
