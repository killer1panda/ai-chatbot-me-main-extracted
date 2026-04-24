import Link from 'next/link'

const StripeRefreshPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl border bg-white p-6 shadow-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Stripe connection expired</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your Stripe onboarding session expired. Reconnect from Integrations to continue.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/integration"
            className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium"
          >
            Go to Integrations
          </Link>
          <Link
            href="/settings"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Back to Settings
          </Link>
        </div>
      </div>
    </main>
  )
}

export default StripeRefreshPage
