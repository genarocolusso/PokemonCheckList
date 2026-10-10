"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useChecklistStore } from "@/store/useChecklistStore";

export function ShinyToggle() {
  const isShiny = useChecklistStore((state) => state.isShiny);
  const toggleShiny = useChecklistStore((state) => state.toggleShiny);

  return (
    <button
      onClick={toggleShiny}
      type="button"
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
        isShiny
          ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50"
          : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      }`}
      title={isShiny ? "Modo Shiny ativado! Clique para voltar aos normais" : "Ativar visualização de Pokémon Shiny"}
      aria-pressed={isShiny}
    >
      <Sparkles
        className={`w-4 h-4 transition-all duration-300 ${
          isShiny
            ? "text-slate-950 fill-slate-950 animate-shiny"
            : "text-amber-500 group-hover:scale-110"
        }`}
      />
      <span className="hidden sm:inline">
        {isShiny ? "Shiny Ativo" : "Shiny"}
      </span>
      {isShiny && (
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
        </span>
      )}
    </button>
  );
}
