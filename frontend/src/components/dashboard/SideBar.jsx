import React from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {

    
  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white transition-colors duration-300 border border-t rounded">
      


      <div className="flex relative">

        {/* Desktop */}
        <div className="hidden sm:block min-h-screen p-4 w-64 border-r bg-white dark:bg-slate-900 py-6">
          <SideBar />
        </div>

        {/* main Content */}
        <div className="flex-1 p-4">
          <h1 className='font-bold text-2xl px-2'>Welcome to Dashboard</h1>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default SideBar