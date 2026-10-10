"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GAMES } from "@/utils/constants";
import { fetchPokedex } from "@/services/pokeApi";
import { useChecklistStore, EMPTY_CAUGHT_LIST } from "@/store/useChecklistStore";
import { ChecklistStats } from "@/components/checklist/ChecklistStats";
import { FilterBar } from "@/components/checklist/FilterBar";
import { PokemonGrid } from "@/components/checklist/PokemonGrid";
import { PrintLayout } from "@/components/print/PrintLayout";
import { GameBadge } from "@/components/game/GameBadge";
import { GameSelectorModal } from "@/components/game/GameSelector";
import { DataBackupModal } from "@/components/checklist/DataBackupModal";
import { AlertCircle, RefreshCcw, Sparkles } from "lucide-react";

export default function HomePage() {
  const selectedGameId = useChecklistStore((state) => state.selectedGame);
  const markAll = useChecklistStore((state) => state.markAll);
  const clearAll = useChecklistStore((state) => state.clearAll);
  const caughtPokemon = useChecklistStore((state) => state.caughtPokemon);

  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  const currentGame = GAMES.find((g) => g.id === selectedGameId) || GAMES[0];

  // TanStack Query for fetching regional pokedex data
  const {
    data: pokemonList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pokedex", currentGame.pokedexId],
    queryFn: () => fetchPokedex(currentGame.pokedexId),
  });

  const currentGameCaught = caughtPokemon[currentGame.id] ?? EMPTY_CAUGHT_LIST;
  const caughtInThisDex = pokemonList.filter((p) =>
    currentGameCaught.includes(p.nationalId)
  ).length;

  const handleMarkAll = () => {
    if (pokemonList.length === 0) return;
    const confirm = window.confirm(
      `Deseja marcar todos os ${pokemonList.length} Pokémon de ${currentGame.name} como capturados?`
    );
    if (confirm) {
      markAll(
        currentGame.id,
        pokemonList.map((p) => p.nationalId)
      );
    }
  };

  const handleClearAll = () => {
    if (currentGameCaught.length === 0) return;
    const confirm = window.confirm(
      `Deseja desmarcar todos os Pokémon capturados em ${currentGame.name}?`
    );
    if (confirm) {
      clearAll(currentGame.id);
    }
  };

  return (
    <>
      {/* Screen layout */}
      <main className="no-print min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
        {/* Game Title & Badge Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                Pokédex Regional
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Região de {currentGame.region}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              {currentGame.name}
            </h1>
          </div>

          <GameBadge
            game={currentGame}
            onClick={() => setIsGameSelectorOpen(true)}
          />
        </div>

        {/* Error Alert */}
        {isError && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>
                Erro ao carregar dados da PokéAPI:{" "}
                {(error as Error)?.message || "Verifique sua conexão."}
              </span>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Progress Stats Card */}
        <ChecklistStats
          total={pokemonList.length}
          caught={caughtInThisDex}
        />

        {/* Filters and Search Bar */}
        <FilterBar
          onMarkAll={handleMarkAll}
          onClearAll={handleClearAll}
          onOpenBackup={() => setIsBackupOpen(true)}
        />

        {/* Pokemon Cards Grid */}
        <PokemonGrid
          pokemonList={pokemonList}
          isLoading={isLoading}
          gameId={currentGame.id}
        />
      </main>

      {/* Printable View (Rendered only on @media print) */}
      <PrintLayout
        game={currentGame}
        pokemonList={pokemonList}
      />

      {/* Modals */}
      <GameSelectorModal
        isOpen={isGameSelectorOpen}
        onClose={() => setIsGameSelectorOpen(false)}
      />

      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />
    </>
  );
}
