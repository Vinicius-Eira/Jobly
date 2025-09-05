import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Moon, Sun, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Login() {
  const [darkMode, setDarkMode] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const validatePassword = (value: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{9,}$/


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!validateEmail(email)) {
      newErrors.email = "Digite um e-mail válido"
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "A senha deve ter no mínimo 9 caracteres, incluindo número e caractere especial"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("auth", "true")
      navigate("/")
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center px-4 transition-colors",
        darkMode ? "bg-[#0B1120] text-white" : "bg-gray-50 text-gray-900"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-2xl border shadow-lg p-8 relative",
          darkMode ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"
        )}
      >
        {/* Toggle Dark/Light */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Freelance<span className="text-primary">Hub</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Organize seu negócio com praticidade
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2",
                darkMode
                  ? "bg-[#0F172A] border-gray-700 focus:ring-primary"
                  : "bg-gray-50 border-gray-300 focus:ring-primary"
              )}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className={cn(
                  "w-full rounded-lg border px-3 py-2 pr-10 text-sm outline-none transition focus:ring-2",
                  darkMode
                    ? "bg-[#0F172A] border-gray-700 focus:ring-primary"
                    : "bg-gray-50 border-gray-300 focus:ring-primary"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2 text-white font-medium hover:bg-primary/90 transition"
          >
            Entrar
          </button>
        </form>

        {/* Extras */}
        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-primary hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </div>
  )
}
