"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="no-print w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 px-4 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Pokémon Checklist Tracker
          </p>
          <p className="mt-0.5 text-[11px]">
            Dados fornecidos pela{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-red-500 transition"
            >
              PokéAPI
            </a>
            . Todos os nomes, sprites e artes de Pokémon pertencem à Nintendo, Game Freak e The Pokémon Company.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1">
            Desenvolvido com <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para treinadores
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Suporte Shiny integrado
          </span>
        </div>
      </div>
    </footer>
  );
}
