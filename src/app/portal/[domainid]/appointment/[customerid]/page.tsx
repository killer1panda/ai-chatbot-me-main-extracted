import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from '@/actions/appointment'
import PortalForm from '@/components/forms/portal/portal-form'
import React from 'react'

type Props = { params: { domainid: string; customerid: string } }

const CustomerSignUpForm = async ({ params }: Props) => {
  const questions = await onDomainCustomerResponses(params.customerid)
  const bookings = await onGetAllDomainBookings(params.domainid)

  // Mock data for testing when no real data exists
  const defaultEmail = 'test@example.com'
  const defaultQuestions = [
    {
      id: '1',
      question: 'What is your preferred time?',
      answered: null,
      customerId: params.customerid,
    },
    {
      id: '2',
      question: 'What is the purpose of your appointment?',
      answered: null,
      customerId: params.customerid,
    },
  ]
  const defaultBookings = bookings || []

  return (
    <PortalForm
      bookings={defaultBookings}
      email={questions?.email || defaultEmail}
      domainid={params.domainid}
      customerId={params.customerid}
      questions={questions?.questions || defaultQuestions}
      type="Appointment"
    />
  )
}

export default CustomerSignUpForm