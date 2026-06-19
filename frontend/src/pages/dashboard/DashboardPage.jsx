import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import SideBar from "@/components/dashboard/SideBar";
import TransactionForm from "@/components/transations/TransactionForm";
import TransactionList from "@/components/transations/TransactionList";
import api from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleForClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };
  const handleCreateTransClick = () => {
    setShowCreateForm(true);
  };

  const taskQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions/get");
      return response.data;
    },
    retry: 1,
  });

  // console.log("Tasks Data", taskQuery.data);

  // console.log("Tasks Query error", taskQuery.error);

  const handleEditTask = (trans) => {
    setEditingTask(trans);
    setShowCreateForm(true);
  };

  if (taskQuery.isLoading) {
    return (
      <div className="flex h-screen  items-center justify-center">
        <Loader className=" animate-spin" />
      </div>
    );
  }
  if (taskQuery.isError) {
    return (
      <div className="flex h-screen  items-center justify-center">
        <p className="text-red-500">
          Error Loading tasks: ${taskQuery.error.message}
        </p>
      </div>
    );
  }


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

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

    </div>
    </div>
  );
};

export default DashboardPage;
