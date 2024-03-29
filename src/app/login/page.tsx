import AuthCardWrapper from '@/components/auth-card-wrapper'
import { LoginForm } from '@/components/login-form'
import React from 'react'

const page = () => {
  return (
    <AuthCardWrapper>
      <LoginForm />
    </AuthCardWrapper>
  )
}

export default page