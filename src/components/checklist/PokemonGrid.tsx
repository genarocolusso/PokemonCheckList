"use client";

import React, { useMemo } from "react";
import { PokemonListItem } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";
import { useChecklistStore, EMPTY_CAUGHT_LIST } from "@/store/useChecklistStore";
import { Frown, SearchX } from "lucide-react";

interface PokemonGridProps {
  pokemonList: PokemonListItem[];
  isLoading: boolean;
  gameId: string;
}

export function PokemonGrid({ pokemonList, isLoading, gameId }: PokemonGridProps) {
  const searchQuery = useChecklistStore((state) => state.searchQuery);
  const filterStatus = useChecklistStore((state) => state.filterStatus);
  const selectedType = useChecklistStore((state) => state.selectedType);
  const caughtPokemon = useChecklistStore((state) => state.caughtPokemon);
  const caughtList = caughtPokemon[gameId] ?? EMPTY_CAUGHT_LIST;
  const toggleCaught = useChecklistStore((state) => state.toggleCaught);
  const soundEnabled = useChecklistStore((state) => state.soundEnabled);

  // Play subtle sound on catch toggle
  const playCatchSound = (willBeCaught: boolean) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (willBeCaught) {
        // High cheery chime
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // Lower uncheck blip
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Audio context may be restricted before interaction
    }
  };

  const handleToggle = (id: number) => {
    const isCurrentlyCaught = caughtList.includes(id);
    playCatchSound(!isCurrentlyCaught);
    toggleCaught(gameId, id);
  };

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((p) => {
      // 1. Text Search (name or number)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.displayName.toLowerCase().includes(query) || p.name.includes(query);
        const matchesRegNum = String(p.entryNumber).includes(query);
        const matchesNatNum = String(p.nationalId).includes(query);
        if (!matchesName && !matchesRegNum && !matchesNatNum) {
          return false;
        }
      }

      // 2. Status Filter
      const isCaught = caughtList.includes(p.nationalId);
      if (filterStatus === "caught" && !isCaught) return false;
      if (filterStatus === "uncaught" && isCaught) return false;

      // 3. Type Filter
      if (selectedType && !p.types.includes(selectedType)) {
        return false;
      }

      return true;
    });
  }, [pokemonList, searchQuery, filterStatus, selectedType, caughtList]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse h-48"
          >
            <div className="w-full flex justify-between">
              <div className="w-8 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full my-2" />
            <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded mt-1" />
            <div className="w-14 h-3 bg-slate-200 dark:bg-slate-800 rounded mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl mb-3">
          <SearchX className="w-8 h-8" />
        </div>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-1">
          Nenhum Pokémon encontrado
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Tente ajustar sua busca ou limpar os filtros de tipo e status para visualizar mais resultados.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 px-1 font-medium">
        <span>Exibindo <strong>{filteredPokemon.length}</strong> de {pokemonList.length} Pokémon</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
        {filteredPokemon.map((pokemon) => {
          const isCaught = caughtList.includes(pokemon.nationalId);
          return (
            <PokemonCard
              key={`${gameId}-${pokemon.nationalId}-${pokemon.entryNumber}`}
              pokemon={pokemon}
              isCaught={isCaught}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
