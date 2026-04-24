import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className="w-full flex justify-center">
      <SignIn
        signUpUrl="/auth/sign-up"
        forceRedirectUrl="/conversation"
        fallbackRedirectUrl="/conversation"
      />
    </div>
  )
}

export default SignInPage