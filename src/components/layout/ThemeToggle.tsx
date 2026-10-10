"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useChecklistStore } from "@/store/useChecklistStore";

export function ThemeToggle() {
  const isDarkMode = useChecklistStore((state) => state.isDarkMode);
  const toggleTheme = useChecklistStore((state) => state.toggleTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
      title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
      aria-label="Alternar tema"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
