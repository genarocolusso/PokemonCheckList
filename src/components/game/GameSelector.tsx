"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X, Check, Gamepad2 } from "lucide-react";
import { GAMES } from "@/utils/constants";
import { useChecklistStore } from "@/store/useChecklistStore";

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame?: (gameId: string) => void;
  selectedGameId?: string;
}

export function GameSelectorModal({
  isOpen,
  onClose,
  onSelectGame,
  selectedGameId,
}: GameSelectorProps) {
  const storedSelectedGame = useChecklistStore((state) => state.selectedGame);
  const setGame = useChecklistStore((state) => state.setGame);
  const caughtPokemon = useChecklistStore((state) => state.caughtPokemon);
  const selectedGame = selectedGameId || storedSelectedGame;

  const [filterGen, setFilterGen] = useState<number | "all">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key & block background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const filteredGames =
    filterGen === "all"
      ? GAMES
      : GAMES.filter((g) => g.generation === filterGen);

  const generations = [
    { label: "Todas", value: "all" as const },
    { label: "Gen I", value: 1 },
    { label: "Gen II", value: 2 },
    { label: "Gen III", value: 3 },
    { label: "Gen IV", value: 4 },
    { label: "Gen V", value: 5 },
    { label: "Gen VI", value: 6 },
    { label: "Gen VII", value: 7 },
    { label: "Gen VIII", value: 8 },
    { label: "Gen IX", value: 9 },
    { label: "Nacional", value: 0 },
  ];

  const handleSelectGame = (id: string) => {
    if (onSelectGame) {
      onSelectGame(id);
    } else {
      setGame(id);
    }
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-game-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top of modal */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 dark:bg-red-500/20 shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="modal-game-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100"
              >
                Selecione o Jogo ou Região
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Escolha a versão para carregar a Pokédex oficial correspondente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Fechar (Esc)"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Generation Filter Tabs */}
        <div className="flex items-center gap-1.5 px-5 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto scrollbar-none bg-slate-50/70 dark:bg-slate-900/50 shrink-0">
          {generations.map((gen) => (
            <button
              key={gen.label}
              onClick={() => setFilterGen(gen.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                filterGen === gen.value
                  ? "bg-red-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              {gen.label}
            </button>
          ))}
        </div>

        {/* Games Grid - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredGames.map((game) => {
            const isSelected = selectedGame === game.id;
            const caughtCount = caughtPokemon[game.id]?.length || 0;

            return (
              <button
                key={game.id}
                onClick={() => handleSelectGame(game.id)}
                type="button"
                className={`group relative text-left p-4 rounded-xl border transition-all flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-red-500 bg-red-50/50 dark:bg-red-950/25 shadow-md ring-2 ring-red-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm"
                }`}
              >
                {/* Accent Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${game.color.from}, ${game.color.to})`,
                  }}
                />

                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${game.color.badge}`}
                      >
                        {game.generationRoman}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {game.region}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {game.name}
                    </h3>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-red-500 text-white shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span>
                    {game.platform} ({game.releaseYear})
                  </span>
                  {caughtCount > 0 && (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {caughtCount} capturados
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer with close button */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Dica: você também pode pressionar <strong>Esc</strong> para fechar
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export function GameSelectorTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedGameId = useChecklistStore((state) => state.selectedGame);
  const currentGame = GAMES.find((g) => g.id === selectedGameId) || GAMES[0];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/40 text-left"
        title="Trocar jogo ou região"
      >
        <div
          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${currentGame.color.from}, ${currentGame.color.to})`,
          }}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1 max-w-[140px] sm:max-w-[200px]">
              {currentGame.name}
            </span>
            <span
              className={`hidden md:inline-block text-[9px] font-black uppercase px-1 py-0.2 rounded ${currentGame.color.badge}`}
            >
              {currentGame.generationRoman}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {currentGame.region} Dex
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
      </button>

      <GameSelectorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
