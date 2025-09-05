import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, FolderKanban, LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/projetos", label: "Projetos", icon: FolderKanban },
]

export default function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login", { replace: true })
  }

  return (
    <aside className="hidden lg:flex h-screen sticky top-0 flex-col border-r bg-card w-[260px]">
      {/* Logo / Header */}
      <div className="px-5 py-5 border-b">
        <div className="text-xl font-extrabold tracking-tight">
          Freelance<span className="text-primary">Hub</span>
        </div>
        <p className="text-sm text-muted-foreground">Organize seu negócio</p>
      </div>

      {/* Navegação */}
      <nav className="px-2 py-4 flex-1 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
                isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground"
              )
            }
            end={to === "/"}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Ações */}
      <div className="border-t px-4 py-4 flex flex-col gap-3">
        {/* Botões alinhados */}
        <div className="flex justify-center gap-6">
          {/* Botão de tema */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          {/* Sair */}
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} FreelanceHub
        </p>
      </div>
    </aside>
  )
}
