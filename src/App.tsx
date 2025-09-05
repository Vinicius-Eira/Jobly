import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Clientes from "@/pages/Clientes"
import Projetos from "@/pages/Projetos"
import AppLayout from "@/components/layout/AppLayout"

export default function App() {
  const isAuth = localStorage.getItem("auth") === "true"

  return (
    <BrowserRouter>
      <Routes>
        {/* Login sem layout */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas com layout */}
        <Route
          path="/*"
          element={isAuth ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="" element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="projetos" element={<Projetos />} />
        </Route>

        {/* Fallback para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
