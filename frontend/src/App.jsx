import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute"
import DashboardPage from "./pages/dashboard/DashboardPage"
import { Toaster } from "sonner"


const App = () => {
  return (
    <>
     <Routes>
      
      <Route path='/login' element={ <LoginPage /> }/>
      <Route path='/register' element={ <RegisterPage /> }/>
      {/* TODO: add protected Route */}
      <Route path='/dashboard' element={ <ProtectedRoute> <DashboardPage /></ProtectedRoute> }/>
      {/* <Route path='/admin' element={ <AdminProtectedRoute> <AdminPage /></AdminProtectedRoute> }/> */}
      <Route path='/' element={<Navigate to="/login" replace /> }/>

    </Routes>
    <Toaster />
    </>
  )
}

export default App