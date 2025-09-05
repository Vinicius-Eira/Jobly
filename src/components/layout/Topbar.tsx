import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useState } from "react";
import AppSidebar from "./AppSidebar";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="h-full flex items-center justify-between px-4">
          <button
            className="lg:hidden inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <Menu size={18} />
            Menu
          </button>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold tracking-tight">Visão geral</h2>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-[78%] max-w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <AppSidebar />
          </div>
        </div>
      )}
    </>
  );
}
