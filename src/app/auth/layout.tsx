import ThemeToggle from '@/components/theme-toggle'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const user = await currentUser()

  if (user) redirect('/')

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,169,71,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.16),transparent_35%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]" />
      <ThemeToggle className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6" />

      <div className="mx-auto grid min-h-screen w-full max-w-[1280px] lg:grid-cols-[minmax(420px,560px)_1fr]">
        <section className="flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
          <div className="w-full rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl backdrop-blur sm:p-8">
            <Image
              src="/images/logo.png"
              alt="Stratiq AI"
              width={132}
              height={38}
              className="mb-8 h-auto w-[132px]"
              priority
            />
            {children}
          </div>
        </section>

        <aside className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-center lg:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-peach/50 blur-3xl" />

          <h2 className="max-w-xl text-4xl font-bold leading-tight text-foreground">
            Meet Stratiq AI, your sales assistant that captures leads like a real teammate.
          </h2>
          <p className="mt-5 max-w-lg text-base text-muted-foreground">
            Qualify visitors, collect rich contact context, and continue conversations automatically.
          </p>

          <Image
            src="/images/app-ui.png"
            alt="Stratiq AI app preview"
            loading="lazy"
            width={1200}
            height={760}
            className="mt-10 h-auto w-full rounded-2xl border border-border/80 shadow-2xl"
          />
        </aside>
      </div>
    </div>
  )
}

export default Layout