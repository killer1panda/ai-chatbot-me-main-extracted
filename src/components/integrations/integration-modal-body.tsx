import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { StripeConnect } from '../settings/stripe-connect'

type IntegrationModalBodyProps = {
  type: string
  connections: {
    [key in 'stripe']: boolean
  }
}

export const IntegrationModalBody = ({
  type,
  connections,
}: IntegrationModalBodyProps) => {
  switch (type) {
    case 'stripe':
      return (
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-lg">Stripe would like to access</h2>
          {[
            'Payment and bank information',
            'Products and services you sell',
            'Business and tax information',
            'Create and update Products',
          ].map((item, key) => (
            <div
              key={key}
              className="flex gap-3 items-center pl-3"
            >
              <CheckCircle2Icon size={24} />
              <p className="text-base">{item}</p>
            </div>
          ))}
          <div className="flex justify-between mt-8 gap-4">
            <Button 
              variant="outline"
              className="px-6 py-2"
            >
              Learn more
            </Button>
            <StripeConnect connected={connections[type]} />
          </div>
        </div>
      )
    default:
      return <></>
  }
}