import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const DashboardWelcome = ({onCreateTask, showCreateForm}) => {
  return (
    <Card className="border-0 shadow-sm bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
    <CardHeader className="pb-4">
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div className='space-y-2 flex flex-col items-start'>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-base">Here's what's happening with your Transaction today</CardDescription>
            </div>
            {/* TODO: create a new task */}
            <Button onClick={onCreateTask}>
                Create a Transaction
            </Button>
        </div>
    </CardHeader>

        <CardContent className="p-6">
            {/* Card Status */}
        </CardContent>

    </Card>
  )
}

export default DashboardWelcome