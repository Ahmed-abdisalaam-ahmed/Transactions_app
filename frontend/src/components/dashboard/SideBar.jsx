import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, PieChart, Settings, X, Icon, LayoutDashboardIcon, CalendarCheck, ListChecks, Search } from "lucide-react";
import { Input } from "@base-ui/react";
import { Label } from "../ui/label";

const SideBar = ({ onClose }) => {
  return (
    <nav className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between sm:hidden">
        <span className="text-lg font-bold">Menu</span>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className='relative flex-1 max-w-md'>
          <Search  className='absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2'/>

          <Input 
            type="text"
            placeholder='Search'
            className='pl-8 border py-2 mb-2 rounded-lg'
            // value={SearchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="py-3">
      {/* Overview Section */}
        <div className="space-y-4">
          <h2 className="px-4 text-xs font-semibold tracking-tight text-slate-500 uppercase">
            Overview
          </h2>
          <NavLink
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all 
            ${
              isActive
                ? "bg-blue-50 dark:bg-slate-800 text-green-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            }`
            }
            to="/dashboard"
          >
            <LayoutDashboardIcon size={20} className="text-blue-500" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        {/* Tasks Section */}
        <div className="space-y-2 py-4">
          <h2 className="px-4 text-xs font-semibold tracking-tight text-slate-500 uppercase">
            Transactions
          </h2>
          <NavLink
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all 
            ${
              isActive
                ? "bg-blue-50 dark:bg-slate-800 text-green-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            }`
            }
            to="/dashboard/createTransaction"
          >
            <CalendarCheck size={20} className="text-blue-500" />
            <span>Create Transaction</span>
          </NavLink>
          <NavLink
            onClick={ onClose}
            className={({ isActive }) =>
              `group flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all 
            ${
              isActive
                ? "bg-blue-50 dark:bg-slate-800 text-green-500 font-bold"
                : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            }`
            }
            to="/dashboard/transactionList"
          >
            <ListChecks size={20} className="text-blue-500" />
            <span>Transaction Lists</span>
          </NavLink>
        </div>  

      </div>
    </nav>
  );
};

export default SideBar;