"use client";

import React, { useState } from "react";
import { GameSelectorTrigger } from "@/components/game/GameSelector";
import { ShinyToggle } from "./ShinyToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Volume2, VolumeX, Database, Printer } from "lucide-react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { DataBackupModal } from "@/components/checklist/DataBackupModal";

export function Header() {
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const soundEnabled = useChecklistStore((state) => state.soundEnabled);
  const toggleSound = useChecklistStore((state) => state.toggleSound);

  return (
    <>
      <header className="no-print sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Custom SVG Pokéball */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-slate-900 shadow-sm flex flex-col group cursor-pointer hover:rotate-180 transition-transform duration-500">
              <div className="h-1/2 bg-red-600" />
              <div className="h-1/2 bg-white" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-900" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-slate-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-slate-400" />
              </div>
            </div>

            <div>
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Poké<span className="text-red-500">Checklist</span>
              </span>
              <span className="hidden lg:block text-[10px] text-slate-400 font-medium -mt-1">
                Tracker de Capturas por Jogo
              </span>
            </div>
          </div>

          {/* Middle: Game Selector */}
          <div className="flex items-center">
            <GameSelectorTrigger />
          </div>

          {/* Right: Controls & Toggles */}
          <div className="flex items-center gap-2">
            {/* Shiny Mode Toggle */}
            <ShinyToggle />

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
              title={soundEnabled ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Backup & Sync Modal */}
            <button
              onClick={() => setIsBackupOpen(true)}
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
              title="Backup e restauração de dados"
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />
    </>
  );
}
