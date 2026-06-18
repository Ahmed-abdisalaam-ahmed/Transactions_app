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
import useAuthStore from '@/lib/store/authStore'


const LoginForm = () => {

  const navigate = useNavigate()
  
      // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {setAuth} = useAuthStore();
    
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
    
      const loginMutation = useMutation({
        mutationFn: async(credentials) => {
          const Response = await api.post('/auth/login', credentials);
          return Response.data
        },  
        onSuccess: (data) => {

          // TODO: set data to zustand store and navigate to dashboard
          if(data && data.token){
            const user = data.user
            const token = data.token

            setAuth(user, token);
            navigate('/dashboard', { replace: true });
          }          
        },
        onError: (error) => {
            setError(extractErrorMessage(error))
            console.log("err", extractErrorMessage(error))
        }
      })
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
    
    
        if(!formValues.email || !formValues.password){
          setError("All field is required!");
          return
        }
        // TODO: mutation 
        loginMutation.mutate({
          email: formValues.email,
          password: formValues.password
        })

}
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">

          {error && (
            <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                {error}
            </div>
          )}
          
          <div className='space-y-2'>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="shihab@example.com" value={formValues.email} onChange={handleInputChange} required />
          </div>
          
          <div className='space-y-2'>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="**********" value={formValues.password} onChange={handleInputChange} required />
          </div> 

          <div className='py-6 px-6'>
             <Button type="submit" className="w-full cursor-pointer">
            {isLoading ? (<span className='flex items-center gap-2'><LoaderCircle /> login account....</span>) : ("login Account") }
        </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className='text-center text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <a onClick={()=> navigate('/register')} className='text-primary hover:underline font-medium cursor-pointer'>Sign up</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm