import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Toaster } from "sonner";
import TransactionList from "./components/transactions/TransactionList";
import CreateTransaction from "./components/transactions/AddTransaction";
import DashboardWelcome from "./components/dashboard/DashboardWelcome";
import useAuthStore from "./lib/store/authStore";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* TODO: add protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardWelcome />} />
          <Route path="transactionList" element={<TransactionList />} />
          <Route path="createTransaction" element={<CreateTransaction />} />
        </Route>

        {/* <Route path='/admin' element={ <AdminProtectedRoute> <AdminPage /></AdminProtectedRoute> }/> */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
