import Link from 'next/link'

const StripeSuccessPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl border bg-white p-6 shadow-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Stripe connected</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your Stripe account is now connected in test mode. You can continue using checkout flows.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/settings"
            className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium"
          >
            Go to Settings
          </Link>
          <Link
            href="/integration"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            View Integrations
          </Link>
        </div>
      </div>
    </main>
  )
}

export default StripeSuccessPage
