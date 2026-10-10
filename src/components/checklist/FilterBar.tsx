"use client";

import React from "react";
import { Search, X, CheckCheck, RotateCcw, Printer, Image as ImageIcon, Sparkles, Filter } from "lucide-react";
import { ALL_TYPES, TYPE_COLORS } from "@/utils/constants";
import { FilterStatus, PokemonType } from "@/types/pokemon";
import { useChecklistStore } from "@/store/useChecklistStore";

interface FilterBarProps {
  onMarkAll: () => void;
  onClearAll: () => void;
  onOpenBackup: () => void;
}

export function FilterBar({ onMarkAll, onClearAll, onOpenBackup }: FilterBarProps) {
  const searchQuery = useChecklistStore((state) => state.searchQuery);
  const setSearchQuery = useChecklistStore((state) => state.setSearchQuery);
  const filterStatus = useChecklistStore((state) => state.filterStatus);
  const setFilterStatus = useChecklistStore((state) => state.setFilterStatus);
  const selectedType = useChecklistStore((state) => state.selectedType);
  const setSelectedType = useChecklistStore((state) => state.setSelectedType);
  const spriteMode = useChecklistStore((state) => state.spriteMode);
  const setSpriteMode = useChecklistStore((state) => state.setSpriteMode);

  const statusOptions: { label: string; value: FilterStatus }[] = [
    { label: "Todos", value: "all" },
    { label: "Capturados", value: "caught" },
    { label: "Pendentes", value: "uncaught" },
  ];

  return (
    <div className="w-full flex flex-col gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      {/* Top row: Search input + Status Tabs + Actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou número (#025, Pikachu)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-700/60 self-start md:self-auto">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterStatus === opt.value
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Sprite Style Toggle */}
          <button
            onClick={() => setSpriteMode(spriteMode === "artwork" ? "pixel" : "artwork")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
            title={spriteMode === "artwork" ? "Alternar para sprites pixelados clássicos" : "Alternar para artwork oficial em alta resolução"}
          >
            <ImageIcon className="w-3.5 h-3.5 text-red-500" />
            <span>{spriteMode === "artwork" ? "Artwork" : "Pixel"}</span>
          </button>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Type Filters + Quick batch actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all whitespace-nowrap ${
              selectedType === null
                ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 border-transparent shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
            }`}
          >
            Todos os Tipos
          </button>

          {ALL_TYPES.map((type) => {
            const isSelected = selectedType === type;
            const color = TYPE_COLORS[type];

            return (
              <button
                key={type}
                onClick={() => setSelectedType(isSelected ? null : type)}
                style={
                  isSelected
                    ? {
                        backgroundColor: color.bgHex,
                        color: color.textHex,
                        borderColor: color.borderHex,
                      }
                    : undefined
                }
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-slate-400/50 scale-105 shadow-sm font-black"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:opacity-85"
                }`}
              >
                {color.namePt}
              </button>
            );
          })}
        </div>

        {/* Quick Batch Options */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={onMarkAll}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition"
            title="Marcar todos os Pokémon filtrados como capturados"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Marcar Todos
          </button>

          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
            title="Desmarcar todos deste jogo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
