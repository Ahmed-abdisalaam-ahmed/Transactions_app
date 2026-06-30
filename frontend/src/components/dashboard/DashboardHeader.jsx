import useAuthStore from '@/lib/store/authStore'
import { BadgeDollarSign, ClipboardCheck } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { replace, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const DashboardHeader = () => {

  const {user, setCleanAuth} = useAuthStore()
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const handleLogOut = () => {
    if(confirm("Are you sure you want to logout ? ")){
      setCleanAuth();
      queryClient.clear();
      return navigate("/login", {replace: true})
    }
  }

  return (
    <header className='bg-card border-b border-border shadow-sm '>
      <div className='w-full px-4 py-4 flex items-center justify-between'>


        <div  className='flex items-center gap-3'>
          <div className=' flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
            <BadgeDollarSign className='h-4 w-4 text-primary-foreground'/>
          </div>
          <h1 className=' text-xl font-semibold text-foreground'>
            FinTrack Dashboard
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          <span className='text-sm text-muted-foreground'>
            Welcome, <span className='font-medium text-foreground'>{user?.name || "User"}</span>
          </span>
                <Button className="hover:bg-red-300" variant={"underline"} onClick={handleLogOut}>Login</Button>
        </div>     
      </div>
    </header>
  )
}

export default DashboardHeader