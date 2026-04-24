import { onDomainCustomerResponses } from '@/actions/appointment'
import PortalForm from '@/components/forms/portal/portal-form'
import { client } from '@/lib/prisma'

type Props = {
  params: Promise<{
    domainid: string
    customerid: string
  }>
}

const PaymentPage = async ({ params }: Props) => {
  const { domainid, customerid } = await params

  const questions = await onDomainCustomerResponses(customerid)
  const domain = await client.domain.findUnique({
    where: {
      id: domainid,
    },
    select: {
      products: {
        select: {
          name: true,
          image: true,
          price: true,
        },
      },
      User: {
        select: {
          stripeId: true,
        },
      },
    },
  })

  const fallbackProducts = [
    {
      name: 'Test Product',
      image: '/images/creditcard.png',
      price: 10,
    },
  ]

  const products = domain?.products?.length ? domain.products : fallbackProducts
  const amount = products.reduce((total, product) => total + product.price, 0)

  const defaultQuestions = [
    {
      id: 'payment-step-1',
      question: 'Please confirm your name for the payment receipt.',
      answered: null,
    },
  ]

  return (
    <PortalForm
      questions={questions?.questions || defaultQuestions}
      type="Payment"
      customerId={customerid}
      domainid={domainid}
      email={questions?.email || 'test@example.com'}
      products={products}
      amount={amount}
      stripeId={domain?.User?.stripeId || undefined}
    />
  )
}

export default PaymentPage
