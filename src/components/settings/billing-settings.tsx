import { onGetSubscriptionPlan } from '@/actions/settings'
import React from 'react'
import Section from '../section-label'
import { Card, CardContent, CardDescription } from '../ui/card'
import { CheckCircle2, Plus } from 'lucide-react'
import { pricingCards } from '@/constants/landing-page'

type Props = {}

const BillingSettings = async (props: Props) => {
  const plan = await onGetSubscriptionPlan()
  // Original behavior kept for easy restore:
  // const planFeatures = pricingCards.find(
  //   (card) => card.title.toUpperCase() === plan?.toUpperCase()
  // )?.features
  // if (!planFeatures) return

  const effectivePlan = (plan ?? 'STANDARD') as 'STANDARD' | 'PRO' | 'ULTIMATE'
  const planFeatures =
    pricingCards.find((card) => card.title.toUpperCase() === effectivePlan)
      ?.features ?? []

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-start">
      <div className="xl:col-span-3">
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan."
        />
      </div>
      <div className="xl:col-span-5">
        <Card className="mx-auto box-border w-full max-w-[560px] min-h-[270px] border-2 border-dashed border-zinc-900 bg-zinc-50 flex items-center justify-center rounded-2xl shadow-none ring-0 overflow-visible">
          <CardContent className="flex gap-3 items-center text-zinc-600">
            <div className="rounded-full border-2 border-zinc-300 p-1">
              <Plus className="text-zinc-500" />
            </div>
            <CardDescription className="font-semibold text-zinc-700">
              Upgrade Plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="xl:col-span-4">
        <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
        <p className="text-sm font-semibold">{effectivePlan}</p>
        <div className="flex gap-2 flex-col mt-2">
          {planFeatures.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BillingSettings