import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-slate-700" />
        ) : (
          <Sun className="h-4 w-4 text-slate-300" />
        )}
      </span>
    </button>
  )
}
