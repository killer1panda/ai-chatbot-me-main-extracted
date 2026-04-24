import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import SettingsForm from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar'
// import ProductTable from '@/components/products'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params: Promise<{ domain: string }> }

const DomainSettingsPage = async ({ params }: Props) => {
  const { domain: domainName } = await params
  // const domain = await onGetCurrentDomainInfo(domainName)
  // if (!domain) redirect('/dashboard')
  
  // Mock domain data for testing without authentication
  const domain = {
    subscription: { plan: 'PRO' as 'STANDARD' | 'PRO' | 'ULTIMATE' },
    domains: [{
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: domainName,
      chatBot: { id: 'bot-1', icon: null, welcomeMessage: 'Hello!' },
      products: [],
    }],
  }

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].name}
        />
         <BotTrainingForm id={domain.domains[0].id} />
       {/* <ProductTable
          id={domain.domains[0].id}
          products={domain.domains[0].products || []}
        /> */}
      </div>
    </>
  )
}

export default DomainSettingsPage