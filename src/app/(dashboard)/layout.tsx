import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import PushBootstrap from '@/components/pusher/push-bootstrap'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  // if (!authenticated) {
  //   return <div className="w-full h-screen flex flex-col">{children}</div>
  // }

  return (
    <ChatProvider>
      <PushBootstrap />
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated?.domain} />  
        <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout