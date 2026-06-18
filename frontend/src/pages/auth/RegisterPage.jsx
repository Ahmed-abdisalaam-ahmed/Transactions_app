import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const RegisterPage = () => {
  return (
  <div className='min-h-screen flex flex-col items-center justify-center bg-background p-4'>
    {/* Add max-w-md here to stop it from stretching to the edges */}
    <div className='z-10 w-full max-w-md'> 
      <div className='mb-8 text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-foreground'>Join us today</h1>
        <p className='text-muted-foreground mt-2'>Create an account in just few steps</p>
      </div>
      <RegisterForm />
    </div>
  </div>
  )
}

export default RegisterPage