import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' // Fixed import path
import { Label } from '@/components/ui/label'   // Recommended
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/api/apiClient'
import { extractErrorMessage } from '@/util/errorUtils'
import { toast } from 'sonner'

const RegisterForm = () => {

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
   const  {name, value} = e.target

    setFormValues({
      ...formValues,
      [name] : value
    })
  }

  const registerMutation = useMutation({
    mutationFn: async(userData) => {
      const Response = await api.post('/auth/register', userData);
      console.log("respond data", Response)
      return Response.data
    },  
    onSuccess: () => {
      toast.success("Success data ✅")
      navigate('/login')
    },
    onError: (error) => {
        setError(extractErrorMessage(error))
        console.error("err", extractErrorMessage(error))
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);


    if(!formValues.name || !formValues.email || !formValues.password){
      setError("All field is required!");
      return
    }
    if(formValues.confirmPassword !== formValues.password){
      setError("Passwords don't match!");
      return;
    }

    // TODO: mutation 
    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
  }

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                {error}
            </div>
          )}
          <div className='space-y-2'>
            <Label >Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="ahmed" value={formValues.name} onChange={handleInputChange} required />
          </div>
          
          <div className='space-y-2'>
            <Label>Email</Label>
            <Input id="email" name="email" type="email" placeholder="shihab@example.com" value={formValues.email} onChange={handleInputChange} required />
          </div>
          
          <div className='space-y-2'>
            <Label >Password</Label>
            <Input id="password" name="password" type="password" placeholder="**********" value={formValues.password} onChange={handleInputChange} required />
          </div> 
          
          <div className='space-y-2'>
            <Label>Confirm Password</Label>
            <Input id="confirm" name="confirmPassword" type="password" placeholder="**********" value={formValues.confirmPassword} onChange={handleInputChange} required />
          </div>

          <div className='py-6 px-6'>
            {/* TODO: change a mutation pending */}
             <Button type="submit" className="w-full cursor-pointer">
            {registerMutation.isPending ? (<span className='flex items-center gap-2'><LoaderCircle /> Creating Account....</span>) : ("Creating Account") }
        </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <a onClick={()=> navigate('/login')} className='text-primary hover:underline font-medium cursor-pointer'>Sign in</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RegisterForm