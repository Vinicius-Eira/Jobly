import {
  Home,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  Moon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
        <span className="text-xl font-bold">
          Freelance<span className="text-blue-500">Hub</span>
        </span>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-accent hover:text-accent-foreground"}`
          }
        >
          <Home size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-accent hover:text-accent-foreground"}`
          }
        >
          <Users size={18} />
          Clientes
        </NavLink>

        <NavLink
          to="/projetos"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-accent hover:text-accent-foreground"}`
          }
        >
          <FolderKanban size={18} />
          Projetos
        </NavLink>
      </nav>

      {/* Footer do sidebar */}
      <div className="px-4 py-6 border-t border-border space-y-3">
        {/* Botão de tema */}
        <Button variant="ghost" size="sm" className="w-full flex justify-start gap-2">
          <Moon size={16} />
          Alternar Tema
        </Button>

        {/* Configurações */}
        <NavLink
          to="/config"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <Settings size={18} />
          Configurações
        </NavLink>

        {/* Logout */}
        <Button variant="destructive" size="sm" className="w-full flex justify-start gap-2">
          <LogOut size={16} />
          Sair
        </Button>

        {/* Rodapé */}
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} FreelanceHub
        </p>
      </div>
    </aside>
  );
}
